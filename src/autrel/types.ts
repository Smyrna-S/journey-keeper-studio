export type Category = 'Nature' | 'Culture & Heritage' | 'Food' | 'Adventure';

export type Destination = {
  id: string;
  category: Category;
  destination: string;
  district: string;
  experience: string;
  mission: string;
  difficulty: 'Easy' | 'Moderate';
  budget: '₹' | '₹₹' | '₹₹₹';
  duration: 'Half Day' | '1 Day' | '2 Days';
  season: string;
  coins: number;
  gemScore: number;
  image?: string | undefined;
  images?: string[] | undefined;
  description?: string | undefined;
  whySpecial?: string | undefined;
  howToReach?: string | undefined;
  coordinates?: { lat: number | undefined; lng: number };
};

export type JourneyEntry = {
  id: string;
  destination: string;
  district: string;
  category: string;
  coins: number;
  photoUri?: string | undefined;
  timestamp?: number | undefined;
};

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  isUnlocked: (journey: JourneyEntry[]) => boolean;
};

export type Filters = {
  difficulty?: string | undefined;
  budget?: string | undefined;
  duration?: string | undefined;
  district?: string | undefined;
  search?: string | undefined;
};

export type AdventurerLogEntry = {
  id: string;
  destinationId: string;
  destinationName: string;
  authorName: string;
  rating: number; // 1 to 5
  reviewText: string;
  timestamp: number;
  isUserSubmission?: boolean | undefined;
  explorerRank?: string | undefined;
};
