import { ArrowUpRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JournalShell } from './JournalShell';
import { useAutrel } from './AutrelContext';
import { DESTINATIONS } from '../data/destinations';
import { destinationImage } from '../lib/media';
export function PostcardsJournal(){
 const {openPostcards,journey}=useAutrel(); const list=journey.length?DESTINATIONS.filter(d=>journey.some(j=>j.id===d.id)):DESTINATIONS.filter(d=>['N04','N01','C04'].includes(d.id));
 return <JournalShell><div className="page-heading"><div><div className="eyebrow text-rust">LETTERS FROM ELSEWHERE · CHAPTER 05</div><h1>Postcards.</h1><p>A little piece of the journey. Yours to send.</p></div><Send className="size-10 text-olive" strokeWidth={1}/></div><div className="catalog"><div className="catalog-grid">{list.map(d=><article key={d.id} className="photo-print"><div className="photo-tape"/><img src={journey.find(j=>j.id===d.id)?.photoUri||destinationImage(d)} alt={d.destination} loading="lazy"/><figcaption><p>GREETINGS FROM TAMIL NADU</p><h3>{d.destination}</h3><Button variant="ink" className="text-action px-0" onClick={()=>openPostcards(d)}>Create a postcard <ArrowUpRight/></Button></figcaption></article>)}</div></div></JournalShell>;
}
