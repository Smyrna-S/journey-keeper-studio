import { useEffect, useState, useCallback, useRef } from 'react';
import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { getJourney, replaceJourney, calculateJourneyStats, getStreak } from './journeyStore';
import { getOwnedItemIds, getEquippedItems, getSpentCoins, replaceDepotData } from './depotStore';
import { JourneyEntry } from '../types';

export interface CloudSyncState {
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  syncError: string | null;
  manualSync: () => Promise<void>;
}

export async function syncUserData(user: User): Promise<void> {
  if (!user?.uid) return;

  const userDocRef = doc(db, 'explorers', user.uid);
  const visitsColRef = collection(db, 'explorers', user.uid, 'visits');
  const inventoryColRef = collection(db, 'explorers', user.uid, 'inventory');

  try {
    // 1. Fetch remote user profile & subcollections
    const [userDocSnap, visitsSnap, inventorySnap] = await Promise.all([
      getDoc(userDocRef),
      getDocs(visitsColRef),
      getDocs(inventoryColRef),
    ]);

    const localJourney = getJourney();
    const localStreak = getStreak();
    const localOwned = getOwnedItemIds();
    const localEquipped = getEquippedItems();
    const localSpent = getSpentCoins();

    // 2. Reconcile journey entries (Visited Gems)
    const remoteVisits: JourneyEntry[] = [];
    visitsSnap.forEach((docSnap) => {
      const data = docSnap.data();
      remoteVisits.push({
        id: data.destinationId || docSnap.id,
        destination: data.destinationName,
        district: data.district,
        category: data.category || 'Nature',
        coins: data.coinsAwarded || 150,
        photoUri: data.proofPhotoUrl,
        timestamp: new Date(data.visitedAt).getTime() || Date.now(),
      });
    });

    // Merge by unique destination id (keep whichever has photo or earliest date)
    const gemMap = new Map<string, JourneyEntry>();
    for (const remote of remoteVisits) {
      gemMap.set(remote.id, remote);
    }
    for (const local of localJourney) {
      const existing = gemMap.get(local.id);
      if (!existing || (!existing.photoUri && local.photoUri)) {
        gemMap.set(local.id, local);
      }
    }
    const mergedJourney = Array.from(gemMap.values());

    // 3. Reconcile owned inventory items
    const remoteOwnedIds: string[] = [];
    inventorySnap.forEach((docSnap) => {
      remoteOwnedIds.push(docSnap.id);
    });
    const mergedOwned = Array.from(new Set([...localOwned, ...remoteOwnedIds]));

    // 4. Update local storage with merged truth (silent = true to avoid infinite event feedback loops)
    replaceJourney(mergedJourney, localStreak, true);
    replaceDepotData(mergedOwned, localEquipped, localSpent, true);

    // 5. Calculate master stats
    const stats = calculateJourneyStats(mergedJourney);
    const displayName = user.displayName || (user.isAnonymous ? 'Guest Explorer' : user.email?.split('@')[0]) || 'Adventurer';

    // 6. Write updated profile to Firestore
    const profilePayload = {
      id: user.uid,
      displayName,
      photoURL: user.photoURL || '',
      email: user.email || '',
      totalCoins: stats.totalCoins,
      availableCoins: Math.max(0, stats.totalCoins + 120 - localSpent),
      xp: stats.totalXP,
      level: stats.level,
      rankTitle: stats.rankTitle,
      streakDays: stats.streakDays,
      lastActiveDate: new Date().toISOString(),
      equippedTitleId: localEquipped.theme || '',
      equippedFrameId: localEquipped.stamp || '',
      updatedAt: new Date().toISOString(),
    };

    const batch = writeBatch(db);
    batch.set(userDocRef, profilePayload, { merge: true });

    // Sync any local visits missing in remote
    for (const item of mergedJourney) {
      const visitDoc = doc(visitsColRef, item.id);
      let safeProofPhoto = item.photoUri || '';
      // Ensure proof photo complies with rule boundaries
      if (safeProofPhoto.length > 200000) {
        safeProofPhoto = safeProofPhoto.slice(0, 200000);
      }
      batch.set(
        visitDoc,
        {
          destinationId: item.id,
          destinationName: item.destination,
          district: item.district,
          visitedAt: new Date(item.timestamp || Date.now()).toISOString(),
          proofPhotoUrl: safeProofPhoto,
          verified: true,
          coinsAwarded: item.coins,
          xpAwarded: item.coins * 2,
        },
        { merge: true }
      );
    }

    // Sync any newly owned items missing in remote
    for (const itemId of mergedOwned) {
      const itemDoc = doc(inventoryColRef, itemId);
      batch.set(
        itemDoc,
        {
          itemId,
          itemType: 'gear',
          acquiredAt: new Date().toISOString(),
          isEquipped: Object.values(localEquipped).includes(itemId),
        },
        { merge: true }
      );
    }

    await batch.commit();
  } catch (error) {
    console.error('Cloud sync failed:', error);
    handleFirestoreError(error, OperationType.WRITE, `explorers/${user.uid}`);
  }
}

export function useCloudSync(user: User | null): CloudSyncState {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSyncingRef = useRef(false);
  const lastErrorTimeRef = useRef<number>(0);

  const performSync = useCallback(async () => {
    if (!user?.uid || isSyncingRef.current) return;
    
    // Backoff protection if an error occurred in the last 10 seconds
    const now = Date.now();
    if (now - lastErrorTimeRef.current < 10000) {
      return;
    }

    isSyncingRef.current = true;
    setIsSyncing(true);
    setSyncError(null);
    try {
      await syncUserData(user);
      setLastSyncedAt(new Date());
      lastErrorTimeRef.current = 0;
    } catch (err: any) {
      lastErrorTimeRef.current = Date.now();
      setSyncError(err.message || 'Sync failed');
    } finally {
      isSyncingRef.current = false;
      setIsSyncing(false);
    }
  }, [user]);

  // Initial sync on user login or change
  useEffect(() => {
    if (user?.uid) {
      performSync();
    }
  }, [user?.uid, performSync]);

  // Listen to local game updates and push debounced sync
  useEffect(() => {
    if (!user?.uid) return;

    const handleLocalUpdate = () => {
      // If error occurred recently, do not immediately hammer backend
      if (Date.now() - lastErrorTimeRef.current < 10000) return;

      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      syncTimeoutRef.current = setTimeout(() => {
        performSync();
      }, 3000); // 3s debounce to conserve writes
    };

    window.addEventListener('travelicious_journey_updated', handleLocalUpdate);
    window.addEventListener('travelicious_depot_updated', handleLocalUpdate);

    return () => {
      window.removeEventListener('travelicious_journey_updated', handleLocalUpdate);
      window.removeEventListener('travelicious_depot_updated', handleLocalUpdate);
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [user?.uid, performSync]);

  return {
    isSyncing,
    lastSyncedAt,
    syncError,
    manualSync: performSync,
  };
}
