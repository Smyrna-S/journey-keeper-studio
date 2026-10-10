import React, { useState, useId } from 'react';

export interface AutrelMapleLeafProps {
  className?: string;
  size?: number;
  glow?: boolean;
  animated?: boolean;
  /** Force vector SVG rendering instead of botanical photo element */
  vectorOnly?: boolean;
}

/**
 * AutrelMapleLeaf
 * Authentic botanical recreation of the AUTREL maple leaf:
 * Five-lobed Acer silhouette, deep U-shaped sinuses, radiating palmate venation,
 * rich warm autumn dried caramel/chestnut tones, and gently curved stem.
 */
export const AutrelMapleLeaf: React.FC<AutrelMapleLeafProps> = ({
  className = '',
  size = 64,
  glow = false,
  animated = false,
  vectorOnly = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const uid = useId().replace(/:/g, '');
  const gradBaseId = `mapleGrad-${uid}`;
  const gradStemId = `stemGrad-${uid}`;
  const clipId = `mapleClip-${uid}`;

  // If vectorOnly is false and image hasn't errored, render high-res botanical photograph
  if (!vectorOnly && !imgError) {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 select-none ${
          animated ? 'animate-bounce-subtle' : ''
        } ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/__l5e/assets-v1/0c9d6b3d-2d05-4a53-b2ae-4bd776e2269f/autrel-leaf.jpg"
          alt="AUTREL Maple Leaf"
          className={`w-full h-full object-contain filter ${
            glow
              ? 'drop-shadow-[0_8px_20px_rgba(70,30,10,0.38)]'
              : 'drop-shadow-[0_4px_12px_rgba(50,22,8,0.22)]'
          } transition-transform duration-300`}
          onError={() => setImgError(true)}
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Botanical 5-lobed Sugar Maple vector SVG (Acer saccharum)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none overflow-visible transition-transform duration-300 ${
        glow ? 'drop-shadow-[0_8px_20px_rgba(80,36,12,0.35)]' : 'drop-shadow-[0_4px_12px_rgba(60,28,10,0.2)]'
      } ${animated ? 'animate-bounce-subtle' : ''} ${className}`}
    >
      <defs>
        {/* Autumn Dried Maple Leaf Gradient: Chestnut, Cognac, Amber & Terracotta */}
        <radialGradient
          id={gradBaseId}
          cx="100"
          cy="115"
          r="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#934517" />
          <stop offset="30%" stopColor="#A8521F" />
          <stop offset="65%" stopColor="#7E3711" />
          <stop offset="85%" stopColor="#62280A" />
          <stop offset="100%" stopColor="#451A05" />
        </radialGradient>

        {/* Stem Gradient */}
        <linearGradient id={gradStemId} x1="100" y1="160" x2="100" y2="206" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#552309" />
          <stop offset="60%" stopColor="#6E2E0D" />
          <stop offset="100%" stopColor="#3C1604" />
        </linearGradient>

        {/* Botanical 5-lobed Maple Leaf Silhouette (True Acer saccharum anatomy) */}
        <clipPath id={clipId}>
          <path
            d="
              M 100 18
              C 103 28 106 35 111 37
              C 107 43 113 46 118 45
              C 114 53 120 57 127 54
              C 123 62 130 65 139 63
              C 134 71 140 75 149 74
              C 142 81 146 87 156 86
              C 148 93 147 100 159 101
              C 147 106 142 115 148 124
              C 139 124 134 131 137 141
              C 129 139 124 146 125 154
              C 119 151 113 156 111 163
              C 107 160 103 162 100 167
              C 97 162 93 160 89 163
              C 87 156 81 151 75 154
              C 76 146 71 139 63 141
              C 66 131 61 124 52 124
              C 58 115 53 106 41 101
              C 53 100 52 93 44 86
              C 54 87 58 81 51 74
              C 60 75 66 71 61 63
              C 70 65 77 62 73 54
              C 80 57 86 53 82 45
              C 87 46 93 43 89 37
              C 94 35 97 28 100 18
              Z
            "
          />
        </clipPath>
      </defs>

      {/* Straight vertical Petiole (Stem) aligned on center axis */}
      <path
        d="M 100 164 L 100 206"
        stroke={`url(#${gradStemId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 100.5 165 L 100.5 204"
        stroke="#A55420"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Main Maple Leaf Blade */}
      <g clipPath={`url(#${clipId})`}>
        {/* Base rich dried autumn tone */}
        <rect x="25" y="10" width="150" height="175" fill={`url(#${gradBaseId})`} />

        {/* Autumn mottling highlights */}
        <circle cx="85" cy="80" r="16" fill="#C4702D" opacity="0.2" />
        <circle cx="122" cy="92" r="18" fill="#B56025" opacity="0.22" />
        <circle cx="102" cy="50" r="12" fill="#D68237" opacity="0.25" />
        <circle cx="70" cy="110" r="14" fill="#582107" opacity="0.35" />
        <circle cx="132" cy="122" r="14" fill="#4B1C05" opacity="0.32" />
        <circle cx="98" cy="135" r="22" fill="#692C0C" opacity="0.28" />

        {/* PALMATE VEIN ARCHITECTURE radiating from leaf base */}
        {/* 1. Central Vein to Terminal Lobe */}
        <path
          d="M 100 166 Q 100 95 100 22"
          stroke="#3D1603"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 100.4 166 Q 100.4 95 100.4 22"
          stroke="#C56F2D"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 2. Left Upper Primary Vein */}
        <path
          d="M 100 148 C 92 122 76 96 46 82"
          stroke="#3D1603"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 100 148 C 92 122 76 96 46 82"
          stroke="#BA6527"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 3. Right Upper Primary Vein */}
        <path
          d="M 100 148 C 108 122 124 96 154 82"
          stroke="#3D1603"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 100 148 C 108 122 124 96 154 82"
          stroke="#BA6527"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 4. Left Lower Primary Vein */}
        <path
          d="M 100 154 C 88 144 74 137 54 126"
          stroke="#3D1603"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* 5. Right Lower Primary Vein */}
        <path
          d="M 100 154 C 112 144 126 137 146 126"
          stroke="#3D1603"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Delicate Secondary Pinnate Veins */}
        <path d="M 100 115 Q 88 102 76 96" stroke="#481C06" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <path d="M 100 88 Q 88 74 76 66" stroke="#481C06" strokeWidth="1.0" strokeLinecap="round" opacity="0.55" />
        <path d="M 100 62 Q 90 50 82 44" stroke="#481C06" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
        <path d="M 100 42 Q 94 34 88 28" stroke="#481C06" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />

        <path d="M 100 115 Q 112 102 124 96" stroke="#481C06" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
        <path d="M 100 88 Q 112 74 124 66" stroke="#481C06" strokeWidth="1.0" strokeLinecap="round" opacity="0.55" />
        <path d="M 100 62 Q 110 50 118 44" stroke="#481C06" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
        <path d="M 100 42 Q 106 34 112 28" stroke="#481C06" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      </g>

      {/* Crisp Leaf Contour Outline */}
      <path
        d="
          M 100 18
          C 103 28 106 35 111 37
          C 107 43 113 46 118 45
          C 114 53 120 57 127 54
          C 123 62 130 65 139 63
          C 134 71 140 75 149 74
          C 142 81 146 87 156 86
          C 148 93 147 100 159 101
          C 147 106 142 115 148 124
          C 139 124 134 131 137 141
          C 129 139 124 146 125 154
          C 119 151 113 156 111 163
          C 107 160 103 162 100 167
          C 97 162 93 160 89 163
          C 87 156 81 151 75 154
          C 76 146 71 139 63 141
          C 66 131 61 124 52 124
          C 58 115 53 106 41 101
          C 53 100 52 93 44 86
          C 54 87 58 81 51 74
          C 60 75 66 71 61 63
          C 70 65 77 62 73 54
          C 80 57 86 53 82 45
          C 87 46 93 43 89 37
          C 94 35 97 28 100 18
          Z
        "
        stroke="#451B06"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
};
