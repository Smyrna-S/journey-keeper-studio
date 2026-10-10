import React from 'react';
import { AutrelMapleLeaf } from './AutrelMapleLeaf';

export interface AutrelLogoProps {
  /**
   * 'full': Stacked emblem faithfully matching the reference image:
   *         Maple leaf on top, AUTREL with flourished 'A' in center,
   *         motto 'Take the road less travelled.' below.
   * 'navbar': Horizontal lockup optimized for headers
   * 'compact': Minimal horizontal lockup
   * 'icon': Leaf emblem only
   */
  variant?: 'full' | 'navbar' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
  animated?: boolean;
  showTagline?: boolean;
  onClick?: () => void;
  useImageReference?: boolean;
}

export const AutrelLogo: React.FC<AutrelLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'light',
  animated = false,
  showTagline = true,
  onClick,
  useImageReference = false,
}) => {
  const isDark = theme === 'dark';

  // Primary brand palette matching reference image
  const brandBrown = isDark ? '#F5EBE1' : '#462512';

  // Icon only
  if (variant === 'icon') {
    const iconSizes = { sm: 30, md: 44, lg: 60, xl: 84 };
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
      >
        <AutrelMapleLeaf size={iconSizes[size]} glow animated={animated} />
      </div>
    );
  }

  // Full stacked emblem (Faithful recreation of reference image)
  if (variant === 'full') {
    const scaleMap = {
      sm: { leafSize: 76, wordmarkW: 'max-w-[240px]', mottoSize: 'text-xs sm:text-sm' },
      md: { leafSize: 116, wordmarkW: 'max-w-[320px] sm:max-w-[360px]', mottoSize: 'text-sm sm:text-base' },
      lg: { leafSize: 148, wordmarkW: 'max-w-[400px] sm:max-w-[440px]', mottoSize: 'text-base sm:text-lg' },
      xl: { leafSize: 184, wordmarkW: 'max-w-[480px] sm:max-w-[520px]', mottoSize: 'text-lg sm:text-xl' },
    };
    const currentScale = scaleMap[size];

    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {useImageReference ? (
          <div className="flex flex-col items-center">
            <img
              src="/__l5e/assets-v1/b81b37bf-3976-4cff-87e0-e5b96e8c87a0/autrel-logo.jpg"
              alt="AUTREL — Take the road less travelled."
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain rounded-2xl shadow-sm"
            />
          </div>
        ) : (
          <>
            {/* Realistic Botanical Autumn Maple Leaf Emblem */}
            <div className="relative mb-2.5 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
              <AutrelMapleLeaf
                size={currentScale.leafSize}
                glow
                animated={animated}
              />
            </div>

            {/* Brand Wordmark: AUTREL */}
            <div className={`relative w-full ${currentScale.wordmarkW} mt-1 flex items-center justify-center`}>
              <div className="flex items-baseline justify-center tracking-[0.22em] select-none">
                <span
                  className="font-serif font-bold text-2xl sm:text-3xl text-[#462512] transition-colors"
                  style={{
                    fontFamily: "'Cinzel', 'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                    color: brandBrown,
                    letterSpacing: '0.22em',
                  }}
                >
                  AUTREL
                </span>
              </div>
            </div>

            {/* Tagline / Motto: Take the road less travelled. (NO emoji near AUTREL) */}
            {showTagline && (
              <div className="mt-2 max-w-full">
                <p
                  className={`font-serif tracking-widest ${currentScale.mottoSize} font-medium ${
                    isDark ? 'text-[#ECD1BA]' : 'text-[#5A3824]'
                  }`}
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    letterSpacing: '0.14em',
                  }}
                >
                  Take the road less travelled.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Navbar Horizontal Lockup (NO maple leaf emoji near the word AUTREL)
  if (variant === 'navbar') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
      >
        {/* Emblem Badge containing authentic maple leaf */}
        <div className="relative group shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#F5E6D3] border-2 border-[#D97706]/40 p-1 flex items-center justify-center shadow-md shadow-[#462512]/15 group-hover:scale-105 transition-all duration-300">
            <AutrelMapleLeaf size={34} glow animated={animated} />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-600 ring-2 ring-[#241710]">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        {/* Brand Text Lockup - strictly AUTREL without any leaf emoji */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-serif font-black text-xl sm:text-2xl tracking-[0.16em] leading-tight ${
                isDark ? 'text-[#FAF5EE]' : 'text-[#442413]'
              }`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Cormorant Garamond', serif" }}
            >
              AUTREL
            </span>
            <span className="hidden sm:inline-flex items-center text-[9px] uppercase font-mono font-black px-2 py-0.5 rounded-full bg-[#3D2214] text-[#E8C2A8] border border-[#5E3823]">
              Season 1: Tamil Nadu
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span
                className={`font-serif italic tracking-wide ${
                  isDark ? 'text-[#DEB89A]' : 'text-[#6C422A]'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
              >
                Take the road less travelled.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact Minimal Lockup - strictly AUTREL without leaf emoji
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <AutrelMapleLeaf size={26} glow />
      <span
        className={`font-serif font-bold text-base tracking-[0.18em] ${
          isDark ? 'text-[#FAF5EE]' : 'text-[#442413]'
        }`}
        style={{ fontFamily: "'Cinzel', 'Playfair Display', 'Cormorant Garamond', serif" }}
      >
        AUTREL
      </span>
    </div>
  );
};
