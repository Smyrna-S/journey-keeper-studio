import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Coins, Compass, Flame, Leaf, Map, Mountain, UserRound } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAutrel } from './AutrelContext';

const navigation = [
  { to: '/', label: 'Opening', icon: Leaf, chapter: '00' },
  { to: '/discover', label: 'Discover', icon: Compass, chapter: '01' },
  { to: '/quests', label: 'Quests', icon: Map, chapter: '02' },
  { to: '/journey', label: 'Journey', icon: Mountain, chapter: '03' },
  { to: '/passport', label: 'Passport', icon: BookOpen, chapter: '04' },
  { to: '/postcards', label: 'Postcards', icon: ArrowUpRight, chapter: '05' },
] as const;

const notes = [
  'Pressed on a slow afternoon.',
  'The best roads have no signboards.',
  'Collect quiet moments, not miles.',
  'Somewhere a waterfall is waiting.',
  'Leaves fall so paths can be found.',
];

function chapterIndex(path: string) {
  if (path === '/') return 0;
  if (path.startsWith('/destination')) return 1;
  const i = navigation.findIndex((n, idx) => idx > 0 && path.startsWith(n.to));
  return i < 0 ? 0 : i;
}

export function JournalShell({ children }: { children: ReactNode }) {
  const { stats, openAuth, openDepot } = useAutrel();
  const path = useLocation({ select: l => l.pathname });
  const navigate = useNavigate();
  const current = chapterIndex(path);
  const prevRef = useRef(current);
  const [dir, setDir] = useState<'forward' | 'back'>('forward');
  const [leaf, setLeaf] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    setDir(current >= prevRef.current ? 'forward' : 'back');
    prevRef.current = current;
  }, [current]);

  // occasional drifting leaf, never constant
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setLeaf(true), 4000 + Math.random() * 5000);
    return () => window.clearTimeout(t);
  }, [path]);

  const go = (step: number) => {
    const n = navigation[Math.min(navigation.length - 1, Math.max(0, current + step))];
    if (n && n.to !== path) navigate({ to: n.to });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('input, textarea, select, [contenteditable], .leaflet-container, [role=dialog]')) return;
      if (e.altKey && e.key === 'ArrowRight') go(1);
      if (e.altKey && e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const chapter = navigation[current] ?? navigation[0];

  return <div className="desk">
    <div className="book-cover">
      <div className="journal paper">
        <div className="page-edges" aria-hidden="true" />
        <div className="book-spine" aria-hidden="true" />
        <nav className="chapter-tabs" aria-label="Journal chapters">
          {navigation.map((n, i) => <Link key={n.to} to={n.to} className={`chapter-tab ${i === current ? 'active' : ''}`} title={n.label}>
            <span>{n.chapter}</span>{n.label}
            {i === current && <span className="ribbon" aria-hidden="true" />}
          </Link>)}
        </nav>
        <header className="journal-header paper"><Link to="/" className="brand" aria-label="AUTREL home"><Leaf strokeWidth={1.2} /><span>AUTREL</span></Link>
          <nav aria-label="Main navigation" className="desktop-nav">{navigation.slice(1).map(n => <Link key={n.to} to={n.to} className={`nav-link ${path.startsWith(n.to) ? 'active' : ''}`}>{n.label}</Link>)}</nav>
          <div className="header-tools"><span className="header-token" title="Exploration streak"><Flame /> {stats.streakDays}</span><span className="header-divider" /><Button variant="ink" className="header-token coin-token px-0" onClick={openDepot} title="Travel Coins and explorer gear"><Coins /> {stats.totalCoins}</Button><Button variant="ink" size="icon" className="profile-button" onClick={openAuth} aria-label="Explorer account"><UserRound /></Button></div>
        </header>
        <span className="washi washi-a" aria-hidden="true" />
        <span className="washi washi-b" aria-hidden="true" />
        <button type="button" className="pressed-flower" aria-label="Read a margin note" onClick={() => setNote(notes[Math.floor(Math.random() * notes.length)] ?? null)}>
          <svg viewBox="0 0 60 90" aria-hidden="true"><path d="M30 88 C30 60 28 40 31 20" /><path d="M30 55 C18 50 12 42 10 34 C20 36 27 44 30 55Z" /><path d="M31 42 C42 38 48 30 50 22 C40 24 33 32 31 42Z" /><circle cx="31" cy="15" r="6" /><circle cx="25" cy="12" r="4" /><circle cx="37" cy="12" r="4" /><circle cx="31" cy="7" r="4" /></svg>
        </button>
        {note && <p className="margin-note" role="status" onAnimationEnd={() => setNote(null)}>{note}</p>}
        <main
          key={path}
          className={`journal-page turn-${dir}`}
          onTouchStart={e => { touch.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={e => {
            const start = touch.current; touch.current = null;
            const end = e.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            if ((e.target as HTMLElement).closest('.leaflet-container, input, select, .category-tabs')) return;
            if (end - start < -90) go(1); else if (end - start > 90) go(-1);
          }}
        >
          <div className="page-curl" aria-hidden="true" />
          {children}
        </main>
        <div className="page-turner">
          <Button variant="ink" size="sm" onClick={() => go(-1)} disabled={current === 0} aria-label="Previous chapter"><ChevronLeft /> Previous</Button>
          <span className="page-folio">— {chapter.chapter} · {chapter.label.toUpperCase()} · p. {String(current * 2 + 1).padStart(2, '0')} —</span>
          <Button variant="ink" size="sm" onClick={() => go(1)} disabled={current === navigation.length - 1} aria-label="Next chapter">Next <ChevronRight /></Button>
        </div>
        <footer className="journal-footer"><Link to="/" className="footer-brand">AUTREL <span className="font-note text-sm ml-2">Take the road less travelled.</span></Link><span>TAMIL NADU, INDIA · A JOURNAL OF SMALL DISCOVERIES · <a href="/photo_credits.txt" target="_blank" rel="noreferrer">Photo credits</a></span></footer>
        {leaf && <Leaf className="drift-leaf" strokeWidth={1.2} aria-hidden="true" onAnimationEnd={() => setLeaf(false)} />}
      </div>
    </div>
    <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.slice(1).map(n => <Link key={n.to} to={n.to} className={path.startsWith(n.to) ? 'active' : ''}><n.icon strokeWidth={1.4} />{n.label}</Link>)}</nav>
  </div>;
}
