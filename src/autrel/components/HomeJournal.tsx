import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Coins, Compass, Leaf, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import leaves from '@/assets/autumn-leaves.png';
import { coverImage, destinationImage } from '../lib/media';
import { DESTINATIONS } from '../data/destinations';
import { JournalShell } from './JournalShell';
import { PhotoPrint } from './PhotoPrint';
import { useAutrel } from './AutrelContext';
export function HomeJournal() {
  const { stats, surprise, startQuest } = useAutrel();
  const navigate = useNavigate();
  const featured = DESTINATIONS.find(d => d.id === 'N04') || DESTINATIONS[0];
  const picks = ['N01','C04','A03'].map(id => DESTINATIONS.find(d => d.id === id)).filter(d => d !== undefined);
  const quest = DESTINATIONS.find(d => d.id === 'A02') || DESTINATIONS[0];
  if (!featured || !quest) return null;
  return <JournalShell>
    <section className="journal-cover"><img src={coverImage} alt="Misty tea estates in Valparai, Tamil Nadu" className="cover-photo" width={4096} height={2304} fetchPriority="high" /><div className="cover-wash" /><div className="cover-bottom" />
      <div className="cover-content"><div className="eyebrow"><Compass strokeWidth={1.3} /> THE EXPLORER’S JOURNAL · VOL. 01</div><h1>Take the road<br />less travelled.</h1><p className="cover-copy">Some places aren’t on everyone’s list.<br />They’re waiting to be on yours.</p><div className="cover-actions"><Button variant="journal" asChild><Link to="/discover">Discover hidden gems <ArrowRight /></Link></Button><Button variant="paper" onClick={() => { const d = surprise(); navigate({ to:'/destination/$id',params:{id:d.id} }); }}><Sparkles /> Surprise me</Button></div></div>
      <div className="cover-annotation">Somewhere beyond<br />the familiar.<ArrowDownRight strokeWidth={1} /></div>
      <Link to="/destination/$id" params={{id:featured.id}} className="cover-fieldnote paper" aria-label="Discover Valparai"><img src={destinationImage(featured)} alt="Valparai’s green tea estates" width={500} height={280} /><div className="fieldnote-caption"><span>Valparai, quietly.</span><ArrowUpRight strokeWidth={1} /></div></Link>
      <div className="cover-coordinate"><MapPin strokeWidth={1.2} /><div>10.3262° N · 76.9554° E<br /><span>VALPARAI · WESTERN GHATS</span></div></div>
      <img src={leaves} alt="" className="cover-leaves" width={1024} height={1024} />
    </section>
    <section className="explorer-strip"><div className="explorer-identity"><div className="stamp-circle"><MountainStamp /></div><div><div className="explorer-rank">{stats.rankTitle} <span className="text-rust text-xs ml-1">Lv. {stats.level}</span></div><div className="explorer-small xp-line"><progress value={stats.levelCurrentXP} max={stats.levelTargetXP} aria-label="Explorer level progress" /> {stats.levelCurrentXP} / {stats.levelTargetXP} XP</div></div></div><span className="strip-quote">“Not all who wander are lost.”</span><Link to="/passport" className="strip-link">Your explorer’s passport <ArrowUpRight /></Link></section>
    <section className="chapter"><div className="chapter-heading"><div className="chapter-title"><span className="chapter-number">01</span><div><h2>A little off the beaten path.</h2><div className="chapter-subtitle">Hidden corners. Unhurried moments. Stories worth finding.</div></div></div><Button variant="ink" asChild className="text-action"><Link to="/discover">Open the atlas <ArrowUpRight /></Link></Button></div><div className="discovery-grid">{picks.map((d,i) => <PhotoPrint key={d.id} destination={d} tag={i===0 ? 'A DIFFERENT KIND OF WILD' : undefined} />)}</div></section>
    <section className="next-chapter paper"><div><div className="eyebrow text-rust">02 · FIELD QUESTS</div><h2>Don’t just visit. Venture.</h2><p>A small challenge. A new perspective. A story to keep.</p><Button variant="ink" asChild className="text-action px-0"><Link to="/quests">Find your next quest <ArrowRight /></Link></Button></div><div className="quest-preview"><img src={destinationImage(quest)} alt="Kolli Hills forest" loading="lazy" width={300} height={300}/><div><div className="eyebrow">KOLLI HILLS · ADVENTURE</div><h3>Into the waterfall valley</h3><div className="reward-line"><span><Coins/> +{quest.coins}</span><span><Sparkles/> +{quest.coins*2+quest.gemScore*10} XP</span></div><Button variant="journal" size="sm" className="mt-4 text-[10px]" onClick={() => startQuest(quest)}>Accept quest <ArrowRight /></Button></div></div></section>
  </JournalShell>;
}
function MountainStamp(){ return <Compass strokeWidth={1.1}/>; }
