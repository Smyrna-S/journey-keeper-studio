import React, { useState, useEffect } from 'react';
import { Compass, RotateCw } from 'lucide-react';
import { EquipmentItem } from '../data/equipment';

interface InteractiveCompassProps {
  item: EquipmentItem;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const InteractiveCompass: React.FC<InteractiveCompassProps> = ({
  item,
  size = 'md',
  interactive = true,
}) => {
  const [heading, setHeading] = useState<number>(38); // Default aesthetic heading
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const dialStyle = item.previewDetails?.dialStyle || 'brass';

  // Dimension presets
  const sizeClasses = {
    sm: 'w-16 h-16 text-[9px]',
    md: 'w-32 h-32 sm:w-36 sm:h-36 text-xs',
    lg: 'w-48 h-48 sm:w-56 sm:h-56 text-sm',
  }[size];

  // Colors & Themes based on equipment skin
  const getThemeStyles = () => {
    switch (dialStyle) {
      case 'nautical':
        return {
          caseBorder: 'border-[#0284C7]',
          caseBg: 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0369A1]',
          dialRing: 'border-[#38BDF8]/40 bg-[#0A192F]',
          needleNorth: 'bg-gradient-to-t from-sky-500 to-cyan-300 shadow-cyan-400/50',
          needleSouth: 'bg-gradient-to-b from-slate-400 to-slate-200',
          textColor: 'text-sky-300',
          accent: '#38BDF8',
          cardinals: ['N', 'E', 'S', 'W'],
        };
      case 'terracotta':
        return {
          caseBorder: 'border-[#A34326]',
          caseBg: 'bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#C2410C]',
          dialRing: 'border-[#FDBA74]/50 bg-[#431407]',
          needleNorth: 'bg-gradient-to-t from-[#EA580C] to-[#FDBA74] shadow-orange-500/50',
          needleSouth: 'bg-gradient-to-b from-[#78350F] to-[#D97706]',
          textColor: 'text-[#FED7AA]',
          accent: '#F97316',
          // Tamil Cardinal Points: Vadakku (North), Kizhakku (East), Therku (South), Merku (West)
          cardinals: ['வ (N)', 'கி (E)', 'தெ (S)', 'மே (W)'],
        };
      case 'astrolabe':
        return {
          caseBorder: 'border-[#A855F7]',
          caseBg: 'bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#581C87]',
          dialRing: 'border-[#C084FC]/50 bg-[#0F0D2E]',
          needleNorth: 'bg-gradient-to-t from-[#C084FC] to-[#F472B6] shadow-purple-400/50',
          needleSouth: 'bg-gradient-to-b from-[#6B21A8] to-[#9333EA]',
          textColor: 'text-[#E9D5FF]',
          accent: '#A855F7',
          cardinals: ['✦ N', '✧ E', '✦ S', '✧ W'],
        };
      case 'brass':
      default:
        return {
          caseBorder: 'border-[#B45309]',
          caseBg: 'bg-gradient-to-br from-[#451A03] via-[#78350F] to-[#92400E]',
          dialRing: 'border-[#FDE047]/40 bg-[#291307]',
          needleNorth: 'bg-gradient-to-t from-[#DC2626] to-[#EF4444] shadow-red-500/50',
          needleSouth: 'bg-gradient-to-b from-[#CA8A04] to-[#FDE047]',
          textColor: 'text-[#FEF08A]',
          accent: '#EAB308',
          cardinals: ['N', 'E', 'S', 'W'],
        };
    }
  };

  const theme = getThemeStyles();

  // Rotate needle on click or sweep
  const spinCompass = () => {
    if (!interactive) return;
    setIsRotating(true);
    const randomAngle = Math.floor(Math.random() * 360);
    setHeading((prev) => (prev + 360 + (randomAngle % 180)));
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Outer Casing */}
      <div
        onClick={spinCompass}
        role={interactive ? 'button' : undefined}
        title={interactive ? 'Click to calibrate compass heading' : undefined}
        className={`relative ${sizeClasses} rounded-full p-2 border-2 sm:border-3 ${theme.caseBorder} ${theme.caseBg} shadow-xl shadow-black/30 flex items-center justify-center select-none ${
          interactive ? 'cursor-pointer active:scale-95 transition-transform' : ''
        }`}
      >
        {/* Top Loop / Lanyard Mount for pocket watch compass look */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-full border-2 border-amber-600/70 bg-amber-900/60" />

        {/* Dial Face Plate */}
        <div className={`w-full h-full rounded-full border border-dashed ${theme.dialRing} relative flex items-center justify-center overflow-hidden`}>
          {/* Degree Ring Ticks */}
          <div className="absolute inset-0 rounded-full opacity-40 bg-[radial-gradient(circle,_transparent_60%,_rgba(255,255,255,0.15)_100%)] pointer-events-none" />

          {/* Cardinal Directions */}
          <span className={`absolute top-1 text-[9px] sm:text-[10.5px] font-black ${theme.textColor} tracking-wider`}>
            {theme.cardinals[0]}
          </span>
          <span className={`absolute right-1 text-[9px] sm:text-[10px] font-bold ${theme.textColor}`}>
            {theme.cardinals[1]}
          </span>
          <span className={`absolute bottom-1 text-[9px] sm:text-[10px] font-bold ${theme.textColor}`}>
            {theme.cardinals[2]}
          </span>
          <span className={`absolute left-1 text-[9px] sm:text-[10px] font-bold ${theme.textColor}`}>
            {theme.cardinals[3]}
          </span>

          {/* Central Pivot Jewel */}
          <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border border-amber-900 z-20 shadow-xs" />

          {/* Needle Assembly */}
          <div
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-700 ease-out pointer-events-none"
            style={{ transform: `rotate(${heading}deg)` }}
          >
            {/* North Point */}
            <div className={`absolute top-2 w-1.5 sm:w-2 h-[42%] rounded-t-full ${theme.needleNorth} shadow-md`} />
            {/* South Point */}
            <div className={`absolute bottom-2 w-1.5 sm:w-2 h-[42%] rounded-b-full ${theme.needleSouth} opacity-90`} />
          </div>
        </div>
      </div>

      {interactive && size !== 'sm' && (
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-mono font-bold text-[#8A4A2B]">
            <Compass className="w-3 h-3 text-[#C1512F]" />
            <span>Heading: {(heading % 360).toFixed(0)}° Azimuth</span>
            <RotateCw className={`w-3 h-3 text-[#8A7568] ml-1 ${isRotating ? 'animate-spin' : ''}`} />
          </div>
          <span className="text-[10px] text-[#A59487]">Click dial to spin & calibrate</span>
        </div>
      )}
    </div>
  );
};
