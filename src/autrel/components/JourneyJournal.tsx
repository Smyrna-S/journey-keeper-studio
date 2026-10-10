import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JournalShell } from './JournalShell';
import { useAutrel } from './AutrelContext';
import { DESTINATIONS } from '../data/destinations';
import { destinationImage } from '../lib/media';
export function JourneyJournal(){
 const {journey,removeEntry,openPostcards}=useAutrel(); const [pending,setPending]=useState<number|string|null>(null);
 return <JournalShell><div className="page-heading"><div><div className="eyebrow text-rust">MEMORIES FROM THE ROAD · CHAPTER 03</div><h1>My journey.</h1><p>Places you’ve found. Moments you’ve made your own.</p></div><BookOpen className="size-11 text-olive" strokeWidth={1}/></div><div className="journey-list">{journey.length? [...journey].reverse().map((j,i)=>{const d=DESTINATIONS.find(d=>d.id===j.id);return <article className="journey-entry" key={`${j.id}-${j.timestamp}-${i}`}><img src={j.photoUri || (d?destinationImage(d):undefined)} alt={j.destination}/><div><div className="eyebrow text-rust">{j.category} · EXPLORED</div><Link to="/destination/$id" params={{id:j.id}}><h2>{j.destination}</h2></Link><p>{j.district} · {j.timestamp?new Date(j.timestamp).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'A collected memory'}</p><Button variant="ink" size="sm" className="px-0 text-[10px]" onClick={()=>openPostcards(d)}><Send/>Make a postcard</Button></div><div className="remove-entry">{pending===(j.timestamp||j.id)?<div className="flex flex-col gap-2"><Button variant="rust" size="sm" onClick={()=>{removeEntry(j);setPending(null);}}>Remove memory</Button><Button variant="ink" size="sm" onClick={()=>setPending(null)}>Keep it</Button></div>:<Button variant="ink" size="icon" aria-label={`Remove ${j.destination} memory`} onClick={()=>setPending(j.timestamp||j.id)}><Trash2/></Button>}</div></article>;}):<div className="empty-state"><BookOpen strokeWidth={1}/><h2>A journal waiting to be written.</h2><p>Your completed expeditions will find a home here.</p><Button variant="journal" asChild className="mt-6"><Link to="/quests">Begin your first quest <ArrowRight/></Link></Button></div>}</div></JournalShell>;
}
