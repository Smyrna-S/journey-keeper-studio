import { useState, useEffect, useCallback } from 'react';
import { EquipmentCategory, EquipmentItem, EQUIPMENT_CATALOG } from '../data/equipment';
import { getJourney } from './journeyStore';

const OWNED_KEY = 'travelicious_owned_gear';
const EQUIPPED_KEY = 'travelicious_equipped_gear';
const SPENT_KEY = 'travelicious_coins_spent';
const DEPOT_EVENT = 'travelicious_depot_updated';
const JOURNEY_EVENT = 'travelicious_journey_updated';

// Welcoming grant so new explorers can immediately purchase and try an item in the Depot
export const WELCOME_EXPEDITION_GRANT = 120;

export const DEFAULT_EQUIPPED: Record<EquipmentCategory, string> = {
  binoculars: 'bino_brass_scout',
  compass: 'comp_brass_standard',
  stamp: 'stamp_explorer_quill',
  theme: 'theme_sepia_antique',
  badge: 'badge_copper_canteen',
};

const DEFAULT_OWNED: string[] = [
  'bino_brass_scout',
  'comp_brass_standard',
  'stamp_explorer_quill',
  'theme_sepia_antique',
  'badge_copper_canteen',
];

export function getOwnedItemIds(): string[] {
  try {
    const raw = localStorage.getItem(OWNED_KEY);
    if (!raw) {
      localStorage.setItem(OWNED_KEY, JSON.stringify(DEFAULT_OWNED));
      return DEFAULT_OWNED;
    }
    const parsed = JSON.parse(raw);
    // Ensure default starter gear is always owned
    const merged = Array.from(new Set([...DEFAULT_OWNED, ...parsed]));
    return merged;
  } catch {
    return DEFAULT_OWNED;
  }
}

export function getEquippedItems(): Record<EquipmentCategory, string> {
  try {
    const raw = localStorage.getItem(EQUIPPED_KEY);
    if (!raw) {
      localStorage.setItem(EQUIPPED_KEY, JSON.stringify(DEFAULT_EQUIPPED));
      return DEFAULT_EQUIPPED;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_EQUIPPED, ...parsed };
  } catch {
    return DEFAULT_EQUIPPED;
  }
}

export function getSpentCoins(): number {
  try {
    const raw = localStorage.getItem(SPENT_KEY);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function replaceDepotData(
  owned: string[],
  equipped?: Partial<Record<EquipmentCategory, string>>,
  spent?: number,
  silent = false
): void {
  try {
    localStorage.setItem(OWNED_KEY, JSON.stringify(owned));
    if (equipped) {
      localStorage.setItem(EQUIPPED_KEY, JSON.stringify({ ...DEFAULT_EQUIPPED, ...equipped }));
    }
    if (typeof spent === 'number') {
      localStorage.setItem(SPENT_KEY, String(spent));
    }
    if (!silent) {
      window.dispatchEvent(new Event(DEPOT_EVENT));
    }
  } catch (err) {
    console.warn('Failed to replace depot data in storage', err);
  }
}

export function calculateDepotWallet() {
  const journey = getJourney();
  const earnedFromQuests = journey.reduce((sum, j) => sum + (j.coins || 0), 0);
  const spent = getSpentCoins();
  const totalBalance = earnedFromQuests + WELCOME_EXPEDITION_GRANT;
  const availableCoins = Math.max(0, totalBalance - spent);

  return {
    earnedFromQuests,
    welcomeGrant: WELCOME_EXPEDITION_GRANT,
    totalBalance,
    spentCoins: spent,
    availableCoins,
  };
}

export function purchaseEquipment(item: EquipmentItem): { success: boolean; message: string } {
  const owned = getOwnedItemIds();
  if (owned.includes(item.id)) {
    return { success: false, message: `${item.name} is already in your backpack!` };
  }

  const wallet = calculateDepotWallet();
  if (wallet.availableCoins < item.price) {
    const needed = item.price - wallet.availableCoins;
    return {
      success: false,
      message: `Insufficient explorer coins! You need ${needed} more coins. Complete more expedition missions to earn coins.`,
    };
  }

  try {
    // Deduct coins
    const newSpent = wallet.spentCoins + item.price;
    localStorage.setItem(SPENT_KEY, String(newSpent));

    // Add to owned
    const updatedOwned = [...owned, item.id];
    localStorage.setItem(OWNED_KEY, JSON.stringify(updatedOwned));

    // Auto-equip purchased item
    const currentEquipped = getEquippedItems();
    currentEquipped[item.category] = item.id;
    localStorage.setItem(EQUIPPED_KEY, JSON.stringify(currentEquipped));

    window.dispatchEvent(new Event(DEPOT_EVENT));
    return { success: true, message: `Acquired and equipped ${item.name}!` };
  } catch (err) {
    console.error('Purchase failed', err);
    return { success: false, message: 'Could not complete Caravan Depot transaction.' };
  }
}

export function equipEquipment(item: EquipmentItem): boolean {
  const owned = getOwnedItemIds();
  if (!owned.includes(item.id)) return false;

  try {
    const currentEquipped = getEquippedItems();
    currentEquipped[item.category] = item.id;
    localStorage.setItem(EQUIPPED_KEY, JSON.stringify(currentEquipped));
    window.dispatchEvent(new Event(DEPOT_EVENT));
    return true;
  } catch (err) {
    console.error('Equip failed', err);
    return false;
  }
}

export function getItemById(id: string): EquipmentItem | undefined {
  return EQUIPMENT_CATALOG.find((item) => item.id === id);
}

export function useDepotStore() {
  const [ownedIds, setOwnedIds] = useState<string[]>(getOwnedItemIds);
  const [equipped, setEquipped] = useState<Record<EquipmentCategory, string>>(getEquippedItems);
  const [wallet, setWallet] = useState(calculateDepotWallet);

  const sync = useCallback(() => {
    setOwnedIds(getOwnedItemIds());
    setEquipped(getEquippedItems());
    setWallet(calculateDepotWallet());
  }, []);

  useEffect(() => {
    const handler = () => sync();
    window.addEventListener(DEPOT_EVENT, handler);
    window.addEventListener(JOURNEY_EVENT, handler);
    return () => {
      window.removeEventListener(DEPOT_EVENT, handler);
      window.removeEventListener(JOURNEY_EVENT, handler);
    };
  }, [sync]);

  const handlePurchase = useCallback((item: EquipmentItem) => {
    const res = purchaseEquipment(item);
    sync();
    return res;
  }, [sync]);

  const handleEquip = useCallback((item: EquipmentItem) => {
    const res = equipEquipment(item);
    sync();
    return res;
  }, [sync]);

  const getEquipped = useCallback(
    (category: EquipmentCategory): EquipmentItem => {
      const activeId = equipped[category] || DEFAULT_EQUIPPED[category];
      const item = getItemById(activeId);
      return item || getItemById(DEFAULT_EQUIPPED[category]);
    },
    [equipped]
  );

  return {
    ownedIds,
    equipped,
    wallet,
    availableCoins: wallet.availableCoins,
    spentCoins: wallet.spentCoins,
    purchase: handlePurchase,
    equip: handleEquip,
    getEquipped,
    isOwned: (id: string) => ownedIds.includes(id),
    isEquipped: (id: string, category: EquipmentCategory) => equipped[category] === id,
  };
}
