import React, { useState } from 'react';
import { EquipmentItem } from '../data/equipment';
import { Check, Sparkles } from 'lucide-react';

interface InteractiveStampSealProps {
  item: EquipmentItem;
  size?: 'sm' | 'md' | 'lg';
  dateString?: string;
  locationName?: string;
}

export const InteractiveStampSeal: React.FC<InteractiveStampSealProps> = ({
  item,
  size = 'md',
  dateString = '24 SEP 2026',
  locationName = 'TAMIL NADU',
}) => {
  const [stamped, setStamped] = useState(false);
  const emblem = item.previewDetails?.sealEmblem || 'quill';

  const sizeClasses = {
    sm: 'w-20 h-20 text-[8px]',
    md: 'w-28 h-28 sm:w-32 sm:h-32 text-[9.5px]',
    lg: 'w-36 h-36 sm:w-44 sm:h-44 text-xs',
  }[size];

  // Specific stamp styling
  const getStampConfig = () => {
    switch (emblem) {
      case 'temple':
        return {
          inkColor: '#B91C1C', // Vermilion / Cinnabar
          outerBorder: 'border-double border-4 border-[#B91C1C]',
          title: 'CHOLA HERITAGE',
          subtitle: 'BRIHADISVARA SEEDHA',
          symbol: '🏛️',
        };
      case 'train':
        return {
          inkColor: '#047857', // Mountain emerald
          outerBorder: 'border-dashed border-3 border-[#047857]',
          title: 'NILGIRI MOUNTAIN RAIL',
          subtitle: 'POSTAL EXPRESS STEAM',
          symbol: '🚂',
        };
      case 'lighthouse':
        return {
          inkColor: '#0369A1', // Ocean cobalt
          outerBorder: 'border-3 border-[#0369A1] rounded-2xl',
          title: "DHANUSHKODI LAND'S END",
          subtitle: 'TWO SEAS CONFLUENCE',
          symbol: '🌊',
        };
      case 'quill':
      default:
        return {
          inkColor: '#78350F', // Sepia / Walnut
          outerBorder: 'border-2 border-[#78350F]',
          title: 'AUTREL GUILD',
          subtitle: 'VERIFIED FIELD AGENT',
          symbol: '✒️',
        };
    }
  };

  const cfg = getStampConfig();

  const handlePress = () => {
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  return (
    <div
      onClick={handlePress}
      title="Click to press stamp on document"
      className={`relative ${sizeClasses} rounded-full flex flex-col items-center justify-center p-2 text-center select-none cursor-pointer transition-transform ${
        stamped ? 'scale-90 rotate-[-4deg]' : 'hover:scale-105 active:scale-95'
      }`}
      style={{ color: cfg.inkColor }}
    >
      {/* Outer Ring */}
      <div className={`absolute inset-0 rounded-full ${cfg.outerBorder} opacity-85 pointer-events-none`} />

      {/* Serrated Ticks Ring */}
      <div className="absolute inset-1 rounded-full border border-dotted opacity-60 pointer-events-none" />

      {/* Stamp Content */}
      <div className="flex flex-col items-center justify-center z-10 font-mono uppercase tracking-tight">
        <span className="font-black text-[8px] sm:text-[9.5px] leading-tight">
          {cfg.title}
        </span>

        <span className="text-xl sm:text-2xl my-0.5 filter drop-shadow-2xs">
          {cfg.symbol}
        </span>

        <span className="font-extrabold text-[7.5px] sm:text-[8.5px] tracking-wider leading-tight">
          {cfg.subtitle}
        </span>

        <div className="mt-1 pt-0.5 border-t border-current w-3/4 flex items-center justify-between text-[7px] font-bold">
          <span>{dateString}</span>
          <span>{locationName}</span>
        </div>
      </div>

      {stamped && (
        <div className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md animate-bounce">
          <Check className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};
