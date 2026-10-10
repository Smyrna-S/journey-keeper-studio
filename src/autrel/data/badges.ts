import { Badge, JourneyEntry } from '../types';

function countByCategory(journey: JourneyEntry[], category: string) {
  return journey.filter((j) => j.category === category).length;
}

export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    emoji: '🥾',
    description: 'Complete your very first hidden gem exploration',
    isUnlocked: (j) => j.length >= 1,
  },
  {
    id: 'nature-lover',
    name: 'Nature Lover',
    emoji: '🌿',
    description: 'Explore 3 or more Nature hidden gems',
    isUnlocked: (j) => countByCategory(j, 'Nature') >= 3,
  },
  {
    id: 'culture-buff',
    name: 'Culture Buff',
    emoji: '🏛️',
    description: 'Discover 3 or more Culture & Heritage treasures',
    isUnlocked: (j) => countByCategory(j, 'Culture & Heritage') >= 3,
  },
  {
    id: 'foodie',
    name: 'Foodie',
    emoji: '🍛',
    description: 'Complete 3 or more authentic regional food missions',
    isUnlocked: (j) => countByCategory(j, 'Food') >= 3,
  },
  {
    id: 'thrill-seeker',
    name: 'Thrill Seeker',
    emoji: '🧗',
    description: 'Trek or navigate 3 or more Adventure challenges',
    isUnlocked: (j) => countByCategory(j, 'Adventure') >= 3,
  },
  {
    id: 'seasoned-explorer',
    name: 'Seasoned Explorer',
    emoji: '🗺️',
    description: 'Unlock 5 or more total destinations across India',
    isUnlocked: (j) => j.length >= 5,
  },
  {
    id: 'travel-legend',
    name: 'Travel Legend',
    emoji: '👑',
    description: 'Unlock 10 or more destinations and master exploration',
    isUnlocked: (j) => j.length >= 10,
  },
  {
    id: 'coin-collector',
    name: 'Coin Collector',
    emoji: '🪙',
    description: 'Accumulate 300 or more total Travel Coins',
    isUnlocked: (j) => j.reduce((sum, e) => sum + e.coins, 0) >= 300,
  },
];
