import { createContext, useContext, useEffect, useState, lazy, Suspense, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Camera, Check, Coins, Leaf, Sparkles, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJourneyStore } from '../lib/journeyStore';
import { destinationImage } from '../lib/media';
import { DESTINATIONS } from '../data/destinations';
import { BADGES } from '../data/badges';
import type { Destination } from '../types';
const OriginalServices = lazy(() => import('./OriginalServices'));

type AutrelState = ReturnType<typeof useJourneyStore> & { startQuest: (d: Destination) => void; openAuth: () => void; openPostcards: (d?: Destination) => void; openDepot: () => void; surprise: () => Destination };
const Context = createContext<AutrelState | null>(null);
export function useAutrel() { const state = useContext(Context); if (!state) throw new Error('AUTREL journal context is missing'); return state; }
export function AutrelProvider({ children }: { children: ReactNode }) {
  const store = useJourneyStore();
  const [mounted, setMounted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [postcardOpen, setPostcardOpen] = useState(false);
  const [depotOpen, setDepotOpen] = useState(false);
  const [postcardDestination, setPostcardDestination] = useState(DESTINATIONS[0]);
  const [quest, setQuest] = useState<Destination | null>(null);
  const [complete, setComplete] = useState<Destination | null>(null);
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  useEffect(() => setMounted(true), []);
  function startQuest(d: Destination) { setPhoto(''); setError(''); setQuest(d); }
  function processFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please choose a JPEG, PNG, or WebP photograph.'); return; }
    setProcessing(true); setError('');
    const reader = new FileReader();
    reader.onerror = () => { setProcessing(false); setError('This photograph could not be opened. Please try another.'); };
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => { setProcessing(false); setError('This image format is not supported.'); };
      image.onload = () => {
        const scale = Math.min(1, 900 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas'); canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.drawImage(image, 0, 0, canvas.width, canvas.height); setPhoto(canvas.toDataURL('image/jpeg', .8)); }
        else if (typeof reader.result === 'string') setPhoto(reader.result);
        setProcessing(false);
      };
      if (typeof reader.result === 'string') image.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  const value: AutrelState = { ...store, startQuest, openAuth: () => setAuthOpen(true), openPostcards: (d) => { if (d) setPostcardDestination(d); setPostcardOpen(true); }, openDepot: () => setDepotOpen(true), surprise: () => { const unvisited = DESTINATIONS.filter(d => !store.journey.some(j => j.id === d.id)); const pool = unvisited.length ? unvisited : DESTINATIONS; return pool[Math.floor(Math.random() * pool.length)] || DESTINATIONS[0]; } };
  return <Context.Provider value={value}>
    {children}
    {mounted && <Suspense fallback={null}><OriginalServices authOpen={authOpen} postcardOpen={postcardOpen} depotOpen={depotOpen} destination={postcardDestination} closeAuth={() => setAuthOpen(false)} closePostcard={() => setPostcardOpen(false)} closeDepot={() => setDepotOpen(false)} /></Suspense>}
    <Dialog.Root open={Boolean(quest)} onOpenChange={open => { if (!open) setQuest(null); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay fixed inset-0 z-50" /><Dialog.Content className="dialog-paper fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <Dialog.Close asChild><Button variant="ink" size="icon" className="dialog-close" aria-label="Close quest"><X /></Button></Dialog.Close>
      <div className="eyebrow text-rust"><Leaf /> Field quest {quest?.id}</div>
      <Dialog.Title className="dialog-title">{quest?.destination}</Dialog.Title>
      <Dialog.Description className="dialog-description">{quest?.mission}</Dialog.Description>
      <div className="reward-line mt-4"><span><Coins /> +{quest?.coins} Travel Coins</span><span><Sparkles /> +{quest ? quest.coins * 2 + quest.gemScore * 10 : 0} XP</span></div>
      {photo ? <img src={photo} alt="Your expedition photograph" className="mission-image" /> : <label className="upload-proof cursor-pointer" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); processFile(e.dataTransfer.files[0]); }}><Camera /><span>{processing ? 'Preparing your photograph…' : 'Add your expedition photograph'}</span><span className="text-muted-foreground"><Upload className="inline size-3" /> Choose a photo</span><input aria-label="Expedition photograph" type="file" accept="image/*" className="sr-only" onChange={e => processFile(e.target.files?.[0])} /></label>}
      {photo && <label className="block cursor-pointer text-xs text-primary mb-4">Change photograph<input aria-label="Change expedition photograph" type="file" accept="image/*" className="sr-only" onChange={e => processFile(e.target.files?.[0])} /></label>}
      <Button variant="ink" size="sm" onClick={() => { if (quest) setPhoto(destinationImage(quest) || ''); }}>Use destination photo <Check /></Button>
      {error && <p className="text-xs text-rust mt-3" role="alert">{error}</p>}
      <div className="mt-5 flex justify-between gap-3"><Dialog.Close asChild><Button variant="paper">Not yet</Button></Dialog.Close><Button variant="journal" disabled={!photo || processing} onClick={() => { if (!quest || !photo) return; store.addEntry(quest, photo); setComplete(quest); setQuest(null); }}><Check /> Complete mission</Button></div>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={Boolean(complete)} onOpenChange={open => { if (!open) setComplete(null); }}><Dialog.Portal><Dialog.Overlay className="dialog-overlay fixed inset-0 z-50" /><Dialog.Content className="dialog-paper fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-center">
      <Dialog.Close asChild><Button variant="ink" size="icon" className="dialog-close" aria-label="Close reward"><X /></Button></Dialog.Close>
      <div className="eyebrow justify-center text-rust">Discovery complete</div><Dialog.Title className="dialog-title mt-4">{complete?.destination}</Dialog.Title><Dialog.Description className="dialog-description">Another place. Another story. A memory in your passport.</Dialog.Description>
      <div className="complete-stamp"><Leaf /><span>EXPLORED · AUTREL</span></div>
      <div className="reward-line justify-center"><span><Coins /> +{complete?.coins} coins</span><span><Sparkles /> +{complete ? complete.coins * 2 + complete.gemScore * 10 : 0} XP</span></div>
      {BADGES.filter(b => b.isUnlocked(store.journey)).length > 0 && <p className="mt-5 text-xs text-muted-foreground">{BADGES.filter(b => b.isUnlocked(store.journey)).length} explorer stamps collected</p>}
      <Dialog.Close asChild><Button variant="rust" className="mt-6">Continue exploring <Leaf /></Button></Dialog.Close>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </Context.Provider>;
}
