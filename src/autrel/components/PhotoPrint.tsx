import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Coins, Leaf } from 'lucide-react';
import { destinationImage } from '../lib/media';
import type { Destination } from '../types';
import { useAutrel } from './AutrelContext';
export function PhotoPrint({ destination: d, tag }: { destination: Destination; tag?: string }) {
  const { journey } = useAutrel();
  const visited = journey.some(j => j.id === d.id);
  return <Link to="/destination/$id" params={{ id: d.id }} className="photo-print" aria-label={`Explore ${d.destination}`}><div className="photo-tape" /><img src={destinationImage(d)} alt={`${d.destination}, ${d.district}`} loading="lazy" width={500} height={340} />{tag && <span className="photo-tag">{tag}</span>}<figcaption><p>{d.category.toUpperCase()} · {d.district.toUpperCase()}</p><h3>{d.destination}</h3><div className="photo-meta"><span><Leaf /> {visited ? 'Collected memory' : 'Hidden gem'}</span><span><Coins className="text-amber" /> +{d.coins}</span><ArrowUpRight /></div></figcaption></Link>;
}
