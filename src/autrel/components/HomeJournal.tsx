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
    <section className="diary-spread">
      <div className="diary-page diary-left">
        <div className="diary-date">{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div>
        <div className="eyebrow text-rust"><Compass strokeWidth={1.3} /> THE EXPLORER’S JOURNAL · VOL. 01</div>
        <h1>Take the road<br />less travelled.</h1>
        <p className="diary-hand">Dear explorer — this journal belongs to whoever turns its pages. Some places aren’t on everyone’s list. They’re waiting to be on yours.</p>
        <div className="diary-entry"><span className="eyebrow">FIELD NOTE · TODAY</span><p>Mist on the tea slopes above Valparai. Lion-tailed macaques at the road bend. Must return in the rains.</p></div>
        <div className="cover-actions"><Button variant="journal" asChild><Link to="/discover">Discover hidden gems <ArrowRight /></Link></Button><Button variant="paper" onClick={() => { const d = surprise(); navigate({ to:'/destination/$id',params:{id:d.id} }); }}><Sparkles /> Surprise me</Button></div>
        <svg className="diary-botanical" viewBox="0 0 120 200" aria-hidden="true"><path d="M60 198 C60 140 55 90 64 20"/><path d="M60 150 C35 140 22 118 18 96 C40 102 55 122 60 150Z"/><path d="M62 112 C86 100 98 80 102 58 C80 64 66 84 62 112Z"/><path d="M63 70 C48 60 42 46 42 32 C56 40 62 54 63 70Z"/></svg>
        <span className="page-number">i</span>
      </div>
      <div className="diary-page diary-right">
        <Link to="/destination/$id" params={{id:featured.id}} className="vintage-photo" aria-label={`Discover ${featured.destination}`}>
          <span className="washi photo-washi" aria-hidden="true" />
          <img src={coverImage} alt="Misty tea estates in Valparai, Tamil Nadu" width={4096} height={2304} fetchPriority="high" />
          <span className="photo-caption">{featured.destination}, quietly.</span>
          <span className="location-stamp"><MapPin strokeWidth={1.2}/>VALPARAI<br/>10.32° N · 76.95° E</span>
        </Link>
        <p className="diary-desc">{featured.description}</p>
        <Button variant="journal" asChild><Link to="/destination/$id" params={{id:featured.id}}>Discover {featured.destination} <ArrowUpRight /></Link></Button>
        <img src={leaves} alt="" className="diary-leaves" width={1024} height={1024} />
        <span className="page-number">ii</span>
      </div>
    </section>
    <section className="explorer-strip"><div className="explorer-identity"><div className="stamp-circle"><MountainStamp /></div><div><div className="explorer-rank">{stats.rankTitle} <span className="text-rust text-xs ml-1">Lv. {stats.level}</span></div><div className="explorer-small xp-line"><progress value={stats.levelCurrentXP} max={stats.levelTargetXP} aria-label="Explorer level progress" /> {stats.levelCurrentXP} / {stats.levelTargetXP} XP</div></div></div><span className="strip-quote">“Not all who wander are lost.”</span><Link to="/passport" className="strip-link">Your explorer’s passport <ArrowUpRight /></Link></section>
    <section className="chapter"><div className="chapter-heading"><div className="chapter-title"><span className="chapter-number">01</span><div><h2>A little off the beaten path.</h2><div className="chapter-subtitle">Hidden corners. Unhurried moments. Stories worth finding.</div></div></div><Button variant="ink" asChild className="text-action"><Link to="/discover">Open the atlas <ArrowUpRight /></Link></Button></div><div className="discovery-grid">{picks.map((d,i) => <PhotoPrint key={d.id} destination={d} tag={i===0 ? 'A DIFFERENT KIND OF WILD' : undefined} />)}</div></section>
    <section className="next-chapter paper"><div><div className="eyebrow text-rust">02 · FIELD QUESTS</div><h2>Don’t just visit. Venture.</h2><p>A small challenge. A new perspective. A story to keep.</p><Button variant="ink" asChild className="text-action px-0"><Link to="/quests">Find your next quest <ArrowRight /></Link></Button></div><div className="quest-preview"><img src={destinationImage(quest)} alt="Kolli Hills forest" loading="lazy" width={300} height={300}/><div><div className="eyebrow">KOLLI HILLS · ADVENTURE</div><h3>Into the waterfall valley</h3><div className="reward-line"><span><Coins/> +{quest.coins}</span><span><Sparkles/> +{quest.coins*2+quest.gemScore*10} XP</span></div><Button variant="journal" size="sm" className="mt-4 text-[10px]" onClick={() => startQuest(quest)}>Accept quest <ArrowRight /></Button></div></div></section>
  </JournalShell>;
}
function MountainStamp(){ return <Compass strokeWidth={1.1}/>; }
