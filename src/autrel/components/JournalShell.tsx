import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, Coins, Compass, Flame, Leaf, Map, Mountain, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAutrel } from './AutrelContext';
const navigation = [ { to: '/discover', label: 'Discover', icon: Compass }, { to: '/quests', label: 'Quests', icon: Map }, { to: '/journey', label: 'Journey', icon: Mountain }, { to: '/passport', label: 'Passport', icon: BookOpen }, { to: '/postcards', label: 'Postcards', icon: ArrowUpRight } ] as const;
export function JournalShell({ children }: { children: ReactNode }) {
  const { stats, openAuth, openDepot } = useAutrel();
  const path = useLocation({ select: l => l.pathname });
  return <div className="desk"><div className="journal paper">
    <header className="journal-header paper"><Link to="/" className="brand" aria-label="AUTREL home"><Leaf strokeWidth={1.2} /><span>AUTREL</span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(n => <Link key={n.to} to={n.to} className={`nav-link ${path.startsWith(n.to) ? 'active' : ''}`}>{n.label}</Link>)}</nav>
      <div className="header-tools"><span className="header-token" title="Exploration streak"><Flame /> {stats.streakDays}</span><span className="header-divider" /><Button variant="ink" className="header-token px-0" onClick={openDepot} title="Travel Coins and explorer gear"><Coins /> {stats.totalCoins}</Button><Button variant="ink" size="icon" className="profile-button" onClick={openAuth} aria-label="Explorer account"><UserRound /></Button></div>
    </header>
    <main>{children}</main>
    <footer className="journal-footer"><Link to="/" className="footer-brand">AUTREL <span className="font-note text-sm ml-2">Go a little further.</span></Link><span>TAMIL NADU, INDIA · A JOURNAL OF SMALL DISCOVERIES · <a href="/photo_credits.txt" target="_blank" rel="noreferrer">Photo credits</a></span></footer>
    <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(n => <Link key={n.to} to={n.to} className={path.startsWith(n.to) ? 'active' : ''}><n.icon strokeWidth={1.4}/>{n.label}</Link>)}</nav>
  </div></div>;
}
