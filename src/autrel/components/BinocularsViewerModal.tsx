import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ZoomOut, Compass, Sparkles, Eye, Shield } from 'lucide-react';
import { EquipmentItem } from '../data/equipment';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';

interface BinocularsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  equippedBinocular: EquipmentItem;
  initialDestination?: Destination | null;
}

export const BinocularsViewerModal: React.FC<BinocularsViewerModalProps> = ({
  isOpen,
  onClose,
  equippedBinocular,
  initialDestination,
}) => {
  const [selectedGem, setSelectedGem] = useState<Destination | undefined>(
    initialDestination || DESTINATIONS[1] || DESTINATIONS[0]
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1.6);
  const [focusFilter, setFocusFilter] = useState<boolean>(true);

  if (!isOpen || !selectedGem) return null;

  const isNightGlass = equippedBinocular.id === 'bino_celestial_glass';
  const isCholaScope = equippedBinocular.id === 'bino_chola_naval_scope';
  const isSurveyor = equippedBinocular.id === 'bino_surveyor_prisms';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative w-full max-w-4xl bg-[#140F0B] rounded-3xl border-2 border-[#523A28] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-[#FAF6F0]"
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-[#241A14] border-b border-[#3D291C] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{equippedBinocular.iconEmoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-[#F5EBE1] font-display">
                    {equippedBinocular.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#3D2418] text-[#E07A5F] border border-[#5C3624]">
                    Field Recon Mode
                  </span>
                </div>
                <p className="text-[11px] text-[#A89283] font-medium">
                  {equippedBinocular.perk} · Scouting {selectedGem.destination}, {selectedGem.district}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Binoculars Optical Viewport */}
          <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] bg-black flex items-center justify-center overflow-hidden">
            {/* The Image being scouted */}
            <div
              className={`absolute inset-0 transition-transform duration-300 ease-out origin-center ${
                focusFilter ? (isNightGlass ? 'brightness-110 contrast-125 saturate-150' : 'contrast-110') : 'blur-[1.5px]'
              }`}
              style={{
                backgroundImage: `url(${selectedGem.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Vintage Double-Circle Lens Mask (Twin Optics of binoculars) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
                <defs>
                  <mask id="binoculars-mask">
                    <rect width="1000" height="600" fill="black" />
                    {/* Left Eye Circle */}
                    <circle cx="360" cy="300" r="230" fill="white" />
                    {/* Right Eye Circle */}
                    <circle cx="640" cy="300" r="230" fill="white" />
                  </mask>
                </defs>

                {/* Dark Vignette outside lenses */}
                <rect width="1000" height="600" fill="rgba(8, 6, 4, 0.94)" mask="url(#binoculars-mask)" />

                {/* Inverted Black Mask for pure cutoff outside the two oculars */}
                <path
                  d="M0,0 L1000,0 L1000,600 L0,600 Z M 360 300 m -230, 0 a 230,230 0 1,0 460,0 a 230,230 0 1,0 -460,0 M 640 300 m -230, 0 a 230,230 0 1,0 460,0 a 230,230 0 1,0 -460,0"
                  fill="#0B0806"
                  fillRule="evenodd"
                />

                {/* Brass Ocular Rim Highlights */}
                <circle
                  cx="360"
                  cy="300"
                  r="230"
                  fill="none"
                  stroke={isCholaScope ? '#F59E0B' : isNightGlass ? '#6366F1' : isSurveyor ? '#0D9488' : '#B45309'}
                  strokeWidth="6"
                  strokeOpacity="0.75"
                />
                <circle
                  cx="640"
                  cy="300"
                  r="230"
                  fill="none"
                  stroke={isCholaScope ? '#F59E0B' : isNightGlass ? '#6366F1' : isSurveyor ? '#0D9488' : '#B45309'}
                  strokeWidth="6"
                  strokeOpacity="0.75"
                />

                {/* Reticle Stadia Lines & Milliradian markings */}
                {/* Left Crosshair */}
                <line x1="360" y1="120" x2="360" y2="480" stroke="rgba(255, 230, 180, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="180" y1="300" x2="540" y2="300" stroke="rgba(255, 230, 180, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Right Crosshair */}
                <line x1="640" y1="120" x2="640" y2="480" stroke="rgba(255, 230, 180, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="460" y1="300" x2="820" y2="300" stroke="rgba(255, 230, 180, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Elevation and Range Finder Ticks */}
                <circle cx="360" cy="300" r="100" fill="none" stroke="rgba(255, 230, 180, 0.3)" strokeWidth="1" strokeDasharray="6 6" />
                <circle cx="640" cy="300" r="100" fill="none" stroke="rgba(255, 230, 180, 0.3)" strokeWidth="1" strokeDasharray="6 6" />

                <circle cx="500" cy="300" r="12" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Live HUD telemetry overlaid on view */}
            <div className="absolute top-4 left-6 pointer-events-none text-xs font-mono text-amber-200/90 flex flex-col gap-1 drop-shadow-md">
              <span className="font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>ELEVATION: {selectedGem.district.includes('Nilgiris') ? '2,240m' : '480m'}</span>
              </span>
              <span>MAGNIFICATION: {zoomLevel.toFixed(1)}X</span>
              <span>BEARING: 042° NE</span>
            </div>

            <div className="absolute top-4 right-6 pointer-events-none text-right text-xs font-mono text-amber-200/90 drop-shadow-md">
              <span className="font-black text-amber-300 block">{selectedGem.destination.toUpperCase()}</span>
              <span className="text-[11px] text-amber-100/70">{selectedGem.experience}</span>
            </div>

            {/* Special Lens Filter Aura */}
            {isNightGlass && (
              <div className="absolute bottom-4 left-6 pointer-events-none px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-400/50 text-[11px] font-mono text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Night-Glass Quartz Filter Engaged</span>
              </div>
            )}
            {isCholaScope && (
              <div className="absolute bottom-4 left-6 pointer-events-none px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-400/50 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Royal Chola Naval Horizon Lens</span>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-[#1E1510] border-t border-[#3D291C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Target Destination Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] uppercase font-bold text-[#A89283] shrink-0">
                Aim Target:
              </span>
              {DESTINATIONS.slice(0, 6).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedGem(dest)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedGem.id === dest.id
                      ? 'bg-[#C1512F] text-white shadow-xs'
                      : 'bg-[#2E2018] text-[#C9B5A5] hover:text-white hover:bg-[#3D2B20]'
                  }`}
                >
                  {dest.destination}
                </button>
              ))}
            </div>

            {/* Zoom & Optics Adjustments */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1.0, +(z - 0.3).toFixed(1)))}
                  className="p-1.5 rounded-lg bg-[#2E2018] text-[#D4C3B4] hover:text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="w-24 sm:w-32 accent-[#C1512F] cursor-pointer"
                />

                <button
                  onClick={() => setZoomLevel((z) => Math.min(3.0, +(z + 0.3).toFixed(1)))}
                  className="p-1.5 rounded-lg bg-[#2E2018] text-[#D4C3B4] hover:text-white cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setFocusFilter(!focusFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  focusFilter
                    ? 'border-emerald-600/70 bg-emerald-950/40 text-emerald-300'
                    : 'border-[#5C3A24] bg-[#2E2018] text-[#A89283]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{focusFilter ? 'Fine Focus: Sharp' : 'Fine Focus: Soft'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
