import { Destination, Filters } from '../types';
import { DESTINATIONS } from './destinations';

export function getRecommendation(
  category: string,
  visitedIds: string[] = [],
  filters: Filters = {}
): Destination | null {
  let pool = DESTINATIONS.filter((d) => d.category === category);

  if (filters.difficulty) pool = pool.filter((d) => d.difficulty === filters.difficulty);
  if (filters.budget) pool = pool.filter((d) => d.budget === filters.budget);
  if (filters.duration) pool = pool.filter((d) => d.duration === filters.duration);
  if (filters.district) pool = pool.filter((d) => d.district.toLowerCase() === filters.district?.toLowerCase());

  if (pool.length === 0) return null;

  const unvisited = pool.filter((d) => !visitedIds.includes(d.id));
  const finalPool = unvisited.length > 0 ? unvisited : pool;

  const sorted = [...finalPool].sort(
    (a, b) => (b.coins + b.gemScore) - (a.coins + a.gemScore)
  );

  return sorted[0] || null;
}

export function searchDestinations(query: string, filters: Filters = {}): Destination[] {
  let pool = DESTINATIONS;

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    pool = pool.filter(
      (d) =>
        d.destination.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.experience.toLowerCase().includes(q) ||
        d.mission.toLowerCase().includes(q)
    );
  }

  if (filters.difficulty) pool = pool.filter((d) => d.difficulty === filters.difficulty);
  if (filters.budget) pool = pool.filter((d) => d.budget === filters.budget);
  if (filters.duration) pool = pool.filter((d) => d.duration === filters.duration);
  if (filters.district) pool = pool.filter((d) => d.district.toLowerCase() === filters.district?.toLowerCase());

  return pool;
}
