import { useState, useEffect, useCallback } from 'react';
import { Destination, JourneyEntry } from '../types';
import { DESTINATIONS } from '../data/destinations';
import { BADGES } from '../data/badges';

const STORAGE_KEY = 'travelicious_journey';
const EVENT_KEY = 'travelicious_journey_updated';
const STREAK_KEY = 'travelicious_streak_days';

export function getJourney(): JourneyEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getStreak(): number {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return parseInt(raw, 10);
    // Initial engaging default streak for new explorers
    localStorage.setItem(STREAK_KEY, '4');
    return 4;
  } catch {
    return 4;
  }
}

export function addJourneyEntry(gem: Destination, photoUri?: string): JourneyEntry[] {
  const current = getJourney();
  const entry: JourneyEntry = {
    id: gem.id,
    destination: gem.destination,
    district: gem.district,
    category: gem.category,
    coins: gem.coins,
    photoUri,
    timestamp: Date.now(),
  };
  const updated = [...current, entry];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const currentStreak = getStreak();
    localStorage.setItem(STREAK_KEY, String(currentStreak + 1));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.warn('Storage quota issue, attempting compact save without large photos', err);
    try {
      // Fallback: save entries preserving stats, stripping bulky previous base64 photos if quota hit
      const lightweight = updated.map((e, idx) => ({
        ...e,
        photoUri: idx === updated.length - 1 ? e.photoUri : undefined,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
      const currentStreak = getStreak();
      localStorage.setItem(STREAK_KEY, String(currentStreak + 1));
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch {
      // Final fallback: save without photo strings
      const minimal = updated.map((e) => ({ ...e, photoUri: undefined }));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
        window.dispatchEvent(new Event(EVENT_KEY));
      } catch (innerErr) {
        console.error('Failed to write journey to storage', innerErr);
      }
    }
  }
  return updated;
}

export function clearJourney(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STREAK_KEY, '1');
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.error('Failed to clear journey', err);
  }
}

export function replaceJourney(entries: JourneyEntry[], streak?: number, silent = false): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    if (typeof streak === 'number') {
      localStorage.setItem(STREAK_KEY, String(streak));
    }
    if (!silent) {
      window.dispatchEvent(new Event(EVENT_KEY));
    }
  } catch (err) {
    console.warn('Failed to replace journey in storage', err);
  }
}

export function removeJourneyEntry(entryToRemove: JourneyEntry | number): JourneyEntry[] {
  const current = getJourney();
  const updated = current.filter((entry) => {
    if (typeof entryToRemove === 'number') {
      return entry.timestamp !== entryToRemove;
    }
    if (entryToRemove.timestamp && entry.timestamp) {
      return entry.timestamp !== entryToRemove.timestamp;
    }
    return entry.id !== entryToRemove.id;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.error('Failed to remove journey entry', err);
  }
  return updated;
}

export interface PlayerStats {
  totalCoins: number;
  totalXP: number;
  level: number;
  rankTitle: string;
  uniqueVisited: number;
  totalDestinations: number;
  percentExplored: number;
  streakDays: number;
  levelCurrentXP: number;
  levelTargetXP: number;
  levelProgressPercent: number;
  xpNeededForNextLevel: number;
  categoryStats: {
    category: string;
    visited: number;
    total: number;
    percent: number;
  }[];
}

export function calculateJourneyStats(journey: JourneyEntry[]): PlayerStats {
  const totalCoins = journey.reduce((sum, j) => sum + j.coins, 0);

  // Each visited gem awards 120 - 240 XP based on coins + gemScore
  const earnedXP = journey.reduce((sum, j) => {
    const dest = DESTINATIONS.find((d) => d.id === j.id);
    const score = dest ? dest.gemScore : 8;
    return sum + (j.coins * 2) + (score * 10);
  }, 0);

  // Base starting XP for an aspiring explorer
  const totalXP = earnedXP;

  // Level thresholds: Level 1 (0 XP), Level 2 (250 XP), Level 3 (600 XP), Level 4 (1100 XP), Level 5 (1700 XP), Level 6 (2400 XP)
  const XP_LEVEL_BRACKETS = [
    { level: 1, minXP: 0, maxXP: 250, title: 'Novice Wanderer' },
    { level: 2, minXP: 250, maxXP: 600, title: 'Trail Pioneer' },
    { level: 3, minXP: 600, maxXP: 1050, title: 'Wilderness Scout' },
    { level: 4, minXP: 1050, maxXP: 1600, title: 'Western Ghats Pathfinder' },
    { level: 5, minXP: 1600, maxXP: 2300, title: 'Seasoned Adventurer' },
    { level: 6, minXP: 2300, maxXP: 3100, title: 'Grand Wayfarer' },
    { level: 7, minXP: 3100, maxXP: 4000, title: 'Legendary Explorer' },
  ];

  let currentBracket = XP_LEVEL_BRACKETS[0] || { level: 1, minXP: 0, maxXP: 250, title: 'Novice Wanderer' };
  for (const bracket of XP_LEVEL_BRACKETS) {
    if (totalXP >= bracket.minXP) {
      currentBracket = bracket;
    }
  }

  const level = currentBracket.level;
  const rankTitle = currentBracket.title;
  const levelXPFloor = currentBracket.minXP;
  const levelXPCeiling = currentBracket.maxXP;
  const levelTargetXP = levelXPCeiling - levelXPFloor;
  const levelCurrentXP = Math.min(levelTargetXP, totalXP - levelXPFloor);
  const levelProgressPercent = Math.min(100, Math.round((levelCurrentXP / levelTargetXP) * 100));
  const xpNeededForNextLevel = Math.max(0, levelXPCeiling - totalXP);

  const uniqueVisited = new Set(journey.map((j) => j.id)).size;
  const totalDestinations = DESTINATIONS.length;
  const percentExplored = Math.round((uniqueVisited / totalDestinations) * 100);
  const streakDays = getStreak();

  // Category breakdowns
  const categories = ['Nature', 'Culture & Heritage', 'Food', 'Adventure'];
  const categoryStats = categories.map((cat) => {
    const totalInCat = DESTINATIONS.filter((d) => d.category === cat).length;
    const visitedInCat = journey.filter((j) => j.category === cat).length;
    return {
      category: cat,
      visited: visitedInCat,
      total: totalInCat,
      percent: Math.round((visitedInCat / Math.max(1, totalInCat)) * 100),
    };
  });

  return {
    totalCoins,
    totalXP,
    level,
    rankTitle,
    uniqueVisited,
    totalDestinations,
    percentExplored,
    streakDays,
    levelCurrentXP,
    levelTargetXP,
    levelProgressPercent,
    xpNeededForNextLevel,
    categoryStats,
  };
}

export function useJourneyStore() {
  const [journey, setJourney] = useState<JourneyEntry[]>([]);
  const [stats, setStats] = useState<PlayerStats>(() => ({ ...calculateJourneyStats([]), streakDays: 0 }));

  const sync = useCallback(() => {
    const j = getJourney();
    setJourney(j);
    setStats(calculateJourneyStats(j));
  }, []);

  const handleClearJourney = useCallback(() => {
    clearJourney();
    sync();
  }, [sync]);

  const handleRemoveEntry = useCallback((entryOrTimestamp: JourneyEntry | number) => {
    removeJourneyEntry(entryOrTimestamp);
    sync();
  }, [sync]);

  useEffect(() => {
    sync();
    const handler = () => sync();
    window.addEventListener(EVENT_KEY, handler);
    return () => window.removeEventListener(EVENT_KEY, handler);
  }, [sync]);

  return {
    journey,
    stats,
    addEntry: addJourneyEntry,
    removeEntry: handleRemoveEntry,
    clearJourney: handleClearJourney,
  };
}
