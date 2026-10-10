import { lazy, Suspense, useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Compass, Grid2X2, Leaf, Map, Search, Sparkles, Utensils, Landmark, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DESTINATIONS } from '../data/destinations';
import { destinationImage } from '../lib/media';
import type { Destination } from '../types';
import { JournalShell } from './JournalShell';
import { PhotoPrint } from './PhotoPrint';
import { useAutrel } from './AutrelContext';
const AtlasMap = lazy(() => import('./FieldAtlasMap'));
export const categories = [{label:'All',icon:Compass},{label:'Nature',icon:Leaf},{label:'Culture & Heritage',icon:Landmark},{label:'Food',icon:Utensils},{label:'Adventure',icon:Mountain}];
export function DiscoverJournal(){
  const [category,setCategory] = useState('All');
  const [search,setSearch] = useState('');
  const [district,setDistrict] = useState('All');
  const [difficulty,setDifficulty] = useState('All');
  const [budget,setBudget] = useState('All');
  const [duration,setDuration] = useState('All');
  const [status,setStatus] = useState('All');
  const [view,setView] = useState<'list'|'map'>('list');
  const [mounted,setMounted] = useState(false);
  const [selected,setSelected] = useState(DESTINATIONS[3]);
  const {journey,surprise} = useAutrel();
  const navigate = useNavigate();
  useEffect(()=>setMounted(true),[]);
  const filtered = useMemo(()=>DESTINATIONS.filter(d => (category==='All'||d.category===category) && (district==='All'||d.district===district) && (difficulty==='All'||d.difficulty===difficulty) && (budget==='All'||d.budget===budget) && (duration==='All'||d.duration===duration) && (status==='All'||(status==='Visited' ? journey.some(j=>j.id===d.id) : !journey.some(j=>j.id===d.id))) && `${d.destination} ${d.district} ${d.experience}`.toLowerCase().includes(search.toLowerCase())),[category,search,district,difficulty,budget,duration,status,journey]);
  const select = useCallback((d:Destination)=>setSelected(d),[]);
  return <JournalShell><div className="page-heading"><div><div className="eyebrow text-rust">THE SOUTHERN TRAIL · CHAPTER 01</div><h1>Field atlas.</h1><p>Places worth taking the detour for.</p></div><div className="flex gap-1"><Button variant={view==='list'?'journal':'paper'} size="icon" onClick={()=>setView('list')} aria-label="Postcard view" title="Postcard view"><Grid2X2/></Button><Button variant={view==='map'?'journal':'paper'} size="icon" onClick={()=>setView('map')} aria-label="Map view" title="Map view"><Map/></Button></div></div>
  <div className="filter-bar"><div className="category-tabs">{categories.map(c=><Button key={c.label} variant={category===c.label?'journal':'ink'} onClick={()=>setCategory(c.label)}><c.icon/>{c.label}</Button>)}</div><label className="search-box"><Search/><input aria-label="Search destinations" placeholder="Search destinations…" value={search} onChange={e=>setSearch(e.target.value)}/></label></div>
  {view==='list' && <div className="filter-selects">{[{label:'District',value:district,set:setDistrict,options:[...new Set(DESTINATIONS.map(d=>d.district))].sort()},{label:'Difficulty',value:difficulty,set:setDifficulty,options:['Easy','Moderate']},{label:'Budget',value:budget,set:setBudget,options:['₹','₹₹','₹₹₹']},{label:'Duration',value:duration,set:setDuration,options:['Half Day','1 Day','2 Days']},{label:'Exploration',value:status,set:setStatus,options:['Visited','Unvisited']}].map(f=><select key={f.label} aria-label={f.label} value={f.value} onChange={e=>f.set(e.target.value)}><option value="All">All {f.label.toLowerCase()}</option>{f.options.map(o=><option key={o}>{o}</option>)}</select>)}<Button variant="ink" size="sm" className="text-[10px]" onClick={()=>{setCategory('All');setSearch('');setDistrict('All');setDifficulty('All');setBudget('All');setDuration('All');setStatus('All');}}>Clear filters</Button></div>}
  {view==='list'? <div className="catalog"><div className="catalog-count">{filtered.length} DISCOVERIES · TAMIL NADU</div>{filtered.length ? <div className="catalog-grid">{filtered.map(d=><PhotoPrint key={d.id} destination={d}/>)}</div> : <div className="empty-state"><Compass/><h2>A different trail, perhaps?</h2><p>No destinations match these field notes.</p></div>}</div> : <div className="atlas-layout"><aside className="atlas-index paper"><div className="eyebrow text-rust">FIELD NOTES</div><h2 className="mt-3">Tamil Nadu</h2><p>{filtered.length} places on this trail</p><div className="category-tabs">{categories.map(c=><Button key={c.label} variant={category===c.label?'journal':'ink'} onClick={()=>setCategory(c.label)}><c.icon/>{c.label}</Button>)}</div><p>Follow a pin. Find a story.</p><Button variant="paper" size="sm" className="mt-4 text-[10px]" onClick={()=>{const d=surprise();navigate({to:'/destination/$id',params:{id:d.id}});}}><Sparkles/> Surprise me</Button></aside><div className="atlas-canvas">{mounted && <Suspense fallback={<div className="empty-state">Opening the atlas…</div>}><AtlasMap destinations={filtered} onSelect={select}/></Suspense>}{selected && <Link to="/destination/$id" params={{id:selected.id}} className="map-note paper"><img src={destinationImage(selected)} alt={selected.destination}/><h3>{selected.destination}</h3><p>{selected.category} · {selected.district}</p><div className="flex items-center justify-between px-1 pt-3 text-[10px] text-primary">Follow the trail <ArrowUpRight className="size-4"/></div></Link>}</div></div>}
  <div className="next-chapter paper"><div><div className="eyebrow">LEAVE ROOM FOR THE UNEXPECTED</div><h2>Let curiosity choose.</h2></div><Button variant="journal" onClick={()=>{const d=surprise();navigate({to:'/destination/$id',params:{id:d.id}});}}><Sparkles/> Surprise me <ArrowRight/></Button></div>
  </JournalShell>;
}
