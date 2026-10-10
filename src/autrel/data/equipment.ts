export type EquipmentCategory = 'binoculars' | 'compass' | 'stamp' | 'theme' | 'badge';
export type EquipmentRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  price: number;
  rarity: EquipmentRarity;
  description: string;
  perk: string;
  iconEmoji: string;
  accentColor: string;
  previewDetails?: {
    metalColor?: string;
    dialStyle?: string;
    sealEmblem?: string;
    textureStyle?: string;
    borderGlow?: string;
  };
}

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  // ================= BINOCULARS =================
  {
    id: 'bino_brass_scout',
    name: 'Field Scout Monocular',
    category: 'binoculars',
    price: 0, // Default Free
    rarity: 'Common',
    description: 'Standard brass field tube with polished ground quartz glass. Reliable along dusty village cartways.',
    perk: 'Standard Trail Vision',
    iconEmoji: '🔭',
    accentColor: '#B45309',
    previewDetails: {
      metalColor: '#B45309',
      borderGlow: 'rgba(180, 83, 9, 0.2)',
    },
  },
  {
    id: 'bino_surveyor_prisms',
    name: "Surveyor's Twin Prisms",
    category: 'binoculars',
    price: 65,
    rarity: 'Rare',
    description: 'Calibrated twin field-glasses used by 19th-century Trigonometrical Surveyors across the Western Ghats.',
    perk: '+15% Distant Ridge Clarity',
    iconEmoji: '👓',
    accentColor: '#0D9488',
    previewDetails: {
      metalColor: '#0D9488',
      borderGlow: 'rgba(13, 148, 136, 0.25)',
    },
  },
  {
    id: 'bino_celestial_glass',
    name: 'Javadi Star-Glass',
    category: 'binoculars',
    price: 110,
    rarity: 'Epic',
    description: 'Night-coated amber optics tuned for dark-sky sanctuaries and nocturnal wildlife spotting in Javadi & Kolli Hills.',
    perk: 'Nocturnal Sky Gazing Mode',
    iconEmoji: '✨',
    accentColor: '#6366F1',
    previewDetails: {
      metalColor: '#6366F1',
      borderGlow: 'rgba(99, 102, 241, 0.25)',
    },
  },
  {
    id: 'bino_chola_naval_scope',
    name: 'Royal Chola Naval Spyglass',
    category: 'binoculars',
    price: 180,
    rarity: 'Legendary',
    description: 'Ornate gold-filigree marine spyglass inspired by Emperor Rajendra Chola’s Bay of Bengal seafaring armadas.',
    perk: 'Legendary Oceanic Horizon Scouting',
    iconEmoji: '🔱',
    accentColor: '#D97706',
    previewDetails: {
      metalColor: '#F59E0B',
      borderGlow: 'rgba(245, 158, 11, 0.4)',
    },
  },

  // ================= COMPASS SKINS =================
  {
    id: 'comp_brass_standard',
    name: 'Vintage Brass Azimuth',
    category: 'compass',
    price: 0, // Default Free
    rarity: 'Common',
    description: 'Classic magnetic pocket needle in a hinged brass hunter case. The trusty companion of every wanderer.',
    perk: 'True Magnetic North Tracking',
    iconEmoji: '🧭',
    accentColor: '#B45309',
    previewDetails: {
      metalColor: '#D97706',
      dialStyle: 'brass',
    },
  },
  {
    id: 'comp_nautical_rosewood',
    name: 'Coromandel Rosewood Compass',
    category: 'compass',
    price: 70,
    rarity: 'Rare',
    description: 'Carved rosewood casing with nautical 32-point compass rose, inspired by Poompuhar and Tuticorin pearl divers.',
    perk: 'Coastal Drift & Wind Calibrations',
    iconEmoji: '⛵',
    accentColor: '#0284C7',
    previewDetails: {
      metalColor: '#0284C7',
      dialStyle: 'nautical',
    },
  },
  {
    id: 'comp_terracotta_sundial',
    name: 'Chettinad Terracotta Sun-Dial',
    category: 'compass',
    price: 115,
    rarity: 'Epic',
    description: 'Kiln-fired earthenware compass dial marked with ancient Tamil cardinal points (Vadakku, Therku, Kizhakku, Merku).',
    perk: 'Tamil Heritage Cardinal Markers',
    iconEmoji: '🏺',
    accentColor: '#C1512F',
    previewDetails: {
      metalColor: '#C1512F',
      dialStyle: 'terracotta',
    },
  },
  {
    id: 'comp_astrolabe_chola',
    name: 'Brihadisvara Celestial Astrolabe',
    category: 'compass',
    price: 195,
    rarity: 'Legendary',
    description: 'Astronomical brass astrolabe reflecting 11th-century temple architectural alignments and stellar navigation rings.',
    perk: 'Planetary Elevation & Alignment Sight',
    iconEmoji: '🪐',
    accentColor: '#9333EA',
    previewDetails: {
      metalColor: '#9333EA',
      dialStyle: 'astrolabe',
    },
  },

  // ================= PASSPORT STAMPS =================
  {
    id: 'stamp_explorer_quill',
    name: 'Expedition Quill Seal',
    category: 'stamp',
    price: 0, // Default Free
    rarity: 'Common',
    description: 'Official AUTREL verified field explorer crest stamped in sepia archival ink.',
    perk: 'Standard Field Authentication',
    iconEmoji: '✒️',
    accentColor: '#78350F',
    previewDetails: {
      sealEmblem: 'quill',
    },
  },
  {
    id: 'stamp_brihadisvara_crest',
    name: 'Great Living Chola Temple Crest',
    category: 'stamp',
    price: 80,
    rarity: 'Rare',
    description: 'Majestic Vimana gopuram silhouette with the imperial Chola tiger crest in rich vermilion cinnabar ink.',
    perk: 'UNESCO Heritage Verified Stamp',
    iconEmoji: '🏛️',
    accentColor: '#DC2626',
    previewDetails: {
      sealEmblem: 'temple',
    },
  },
  {
    id: 'stamp_nilgiri_mountain_rail',
    name: 'Nilgiri Steam Express Postmark',
    category: 'stamp',
    price: 95,
    rarity: 'Rare',
    description: 'Circular heritage mountain railway postal cancellation with vintage cog-wheel gear teeth border.',
    perk: 'Heritage Steam Railway Postmark',
    iconEmoji: '🚂',
    accentColor: '#059669',
    previewDetails: {
      sealEmblem: 'train',
    },
  },
  {
    id: 'stamp_dhanushkodi_lighthouse',
    name: "Dhanushkodi Land's End Seal",
    category: 'stamp',
    price: 140,
    rarity: 'Epic',
    description: 'Confluence insignia of the Indian Ocean and Bay of Bengal with maritime lighthouse beam and ghost town coordinates.',
    perk: 'Edge-of-the-World Commemorative Seal',
    iconEmoji: '🌊',
    accentColor: '#0284C7',
    previewDetails: {
      sealEmblem: 'lighthouse',
    },
  },

  // ================= PARCHMENT THEMES =================
  {
    id: 'theme_sepia_antique',
    name: 'Aged Sepia Ledger',
    category: 'theme',
    price: 0, // Default Free
    rarity: 'Common',
    description: 'Traditional weathered linen parchment with warm cream highlights and antique coffee-stained vignette edges.',
    perk: 'Classic Traveler Aesthetic',
    iconEmoji: '📜',
    accentColor: '#854D0E',
    previewDetails: {
      textureStyle: 'sepia',
    },
  },
  {
    id: 'theme_palm_leaf_manuscript',
    name: 'Ollai (Palm-Leaf Manuscript)',
    category: 'theme',
    price: 85,
    rarity: 'Rare',
    description: 'Evokes ancient Sangam-era cured talipot palm strips with golden bamboo fibre striations and charcoal accents.',
    perk: 'Traditional Tamil Scribe Motif',
    iconEmoji: '🌿',
    accentColor: '#15803D',
    previewDetails: {
      textureStyle: 'palmleaf',
    },
  },
  {
    id: 'theme_chettinad_terracotta',
    name: 'Chettinad Athangudi Rust',
    category: 'theme',
    price: 130,
    rarity: 'Epic',
    description: 'Inspired by handcrafted Athangudi floor tiles: warm terracotta earth tones, burnt ochre, and brass studs.',
    perk: 'Mansion Heritage Warmth',
    iconEmoji: '🧱',
    accentColor: '#C1512F',
    previewDetails: {
      textureStyle: 'terracotta',
    },
  },
  {
    id: 'theme_midnight_ghats',
    name: 'Midnight Anamalai Indigo',
    category: 'theme',
    price: 175,
    rarity: 'Legendary',
    description: 'Deep celestial twilight of high Western Ghats peaks: starlit midnight indigo, silver foil highlights, and firefly amber.',
    perk: 'High-Altitude Starry Contrast',
    iconEmoji: '🌌',
    accentColor: '#312E81',
    previewDetails: {
      textureStyle: 'midnight',
    },
  },

  // ================= TRAVEL BADGES & EMBLEMS =================
  {
    id: 'badge_copper_canteen',
    name: "Wanderer's Copper Canteen",
    category: 'badge',
    price: 0, // Default Free
    rarity: 'Common',
    description: 'Engraved copper flask pin awarded to aspiring travelers setting out on their first Tamil Nadu trail.',
    perk: 'Hydration of the Trail Pioneer',
    iconEmoji: '🍶',
    accentColor: '#B45309',
  },
  {
    id: 'badge_western_ghats_mist',
    name: 'Western Ghats Mist Walker',
    category: 'badge',
    price: 75,
    rarity: 'Rare',
    description: 'Silver pin featuring shola forest silhouettes and flying giant squirrels, awarded to cloud-forest hikers.',
    perk: 'Resilient Fog Pathfinder',
    iconEmoji: '🌲',
    accentColor: '#047857',
  },
  {
    id: 'badge_coromandel_anchor',
    name: 'Coromandel Gilded Anchor',
    category: 'badge',
    price: 100,
    rarity: 'Epic',
    description: 'Embossed nautical anchor medallion in polished brass, honoring explorers of the ancient Spice and Silk sea routes.',
    perk: 'Coastal Mariner Esteem',
    iconEmoji: '⚓',
    accentColor: '#0284C7',
  },
  {
    id: 'badge_grand_caravan_master',
    name: 'Grand Caravan Master Crest',
    category: 'badge',
    price: 220,
    rarity: 'Legendary',
    description: 'Supreme guildmaster medallion struck in 24k gold leaf, reserved for the foremost cartographers and expedition leaders.',
    perk: 'Max Prestige Caravan Commander',
    iconEmoji: '👑',
    accentColor: '#EAB308',
  },
];
