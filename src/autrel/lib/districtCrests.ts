export interface DistrictCrestInfo {
  name: string;
  tagline: string;
  motto: string;
  coordinates: string;
  pinPrefix: string;
  sealEmblem: 'temple' | 'mountain' | 'coast' | 'mangrove' | 'tea' | 'palace' | 'fort';
  symbolEmoji: string;
}

export const DISTRICT_CRESTS: Record<string, DistrictCrestInfo> = {
  Thanjavur: {
    name: 'Thanjavur',
    tagline: 'Imperial Chola Capital',
    motto: 'CRADLE OF CHOLA ART & ARCHITECTURE',
    coordinates: "10°46'N 79°07'E",
    pinPrefix: '613 001',
    sealEmblem: 'temple',
    symbolEmoji: '🏛️',
  },
  Namakkal: {
    name: 'Namakkal',
    tagline: 'Realm of 70 Hairpin Bends',
    motto: 'HEALING HERBS & RUGGED RIDGES',
    coordinates: "11°13'N 78°09'E",
    pinPrefix: '637 001',
    sealEmblem: 'mountain',
    symbolEmoji: '⛰️',
  },
  Theni: {
    name: 'Theni',
    tagline: 'High Waves Cloud Realm',
    motto: 'MISTY CANOPY & SPICE VALLEYS',
    coordinates: "10°00'N 77°28'E",
    pinPrefix: '625 531',
    sealEmblem: 'tea',
    symbolEmoji: '🍃',
  },
  Cuddalore: {
    name: 'Cuddalore',
    tagline: 'Coromandel Estuary Gateway',
    motto: 'WORLD WATERWAYS & SACRED SHORES',
    coordinates: "11°45'N 79°46'E",
    pinPrefix: '607 001',
    sealEmblem: 'mangrove',
    symbolEmoji: '🌿',
  },
  Nilgiris: {
    name: 'Nilgiris',
    tagline: 'Blue Mountains Reserve',
    motto: 'QUEEN OF THE WESTERN GHATS',
    coordinates: "11°24'N 76°42'E",
    pinPrefix: '643 001',
    sealEmblem: 'mountain',
    symbolEmoji: '🚂',
  },
  Madurai: {
    name: 'Madurai',
    tagline: 'Temple Metropolis of Tamilagam',
    motto: 'CITY OF JASMINE & LIVING HERITAGE',
    coordinates: "09°55'N 78°07'E",
    pinPrefix: '625 001',
    sealEmblem: 'temple',
    symbolEmoji: '🌸',
  },
  Ramanathapuram: {
    name: 'Ramanathapuram',
    tagline: 'Coromandel Land’s End',
    motto: 'CONFLUENCE OF GULFS & MYTHIC BRIDGES',
    coordinates: "09°22'N 78°50'E",
    pinPrefix: '623 501',
    sealEmblem: 'coast',
    symbolEmoji: '🌊',
  },
  Kanyakumari: {
    name: 'Kanyakumari',
    tagline: 'Cape Comorin Tri-Sea Meridian',
    motto: 'WHERE THREE GREAT SEAS EMBRACE',
    coordinates: "08°05'N 77°32'E",
    pinPrefix: '629 001',
    sealEmblem: 'coast',
    symbolEmoji: '🌅',
  },
  Dindigul: {
    name: 'Dindigul',
    tagline: 'Pine Forest & Hill Citadel',
    motto: 'PRINCESS OF HILL STATIONS',
    coordinates: "10°22'N 77°58'E",
    pinPrefix: '624 001',
    sealEmblem: 'mountain',
    symbolEmoji: '🌲',
  },
  Sivaganga: {
    name: 'Sivaganga',
    tagline: 'Palatial Chettinad Domain',
    motto: 'MASTER TILES & EPIC CULINARY ARTS',
    coordinates: "09°51'N 78°29'E",
    pinPrefix: '630 561',
    sealEmblem: 'palace',
    symbolEmoji: '🏰',
  },
  Tirunelveli: {
    name: 'Tirunelveli',
    tagline: 'Perennial Thamirabarani Basin',
    motto: 'SACRED WATERS & MEDICINAL SPRAYS',
    coordinates: "08°43'N 77°42'E",
    pinPrefix: '627 001',
    sealEmblem: 'mountain',
    symbolEmoji: '💧',
  },
  Kanchipuram: {
    name: 'Kanchipuram',
    tagline: 'Golden City of Silks & Sanctuaries',
    motto: 'ANCIENT SEAT OF SCHOLARSHIP & WEAVES',
    coordinates: "12°50'N 79°42'E",
    pinPrefix: '631 501',
    sealEmblem: 'temple',
    symbolEmoji: '🪔',
  },
  Coimbatore: {
    name: 'Coimbatore',
    tagline: 'Kongu Foothills & Western Pass',
    motto: 'GATEWAY TO THE ANAMALAI WILDERNESS',
    coordinates: "11°00'N 76°57'E",
    pinPrefix: '641 001',
    sealEmblem: 'mountain',
    symbolEmoji: '🐅',
  },
  Dharmapuri: {
    name: 'Dharmapuri',
    tagline: 'Niagara of South India',
    motto: 'CAUVERY CORACLE RAPIDS & CANYONS',
    coordinates: "12°07'N 78°09'E",
    pinPrefix: '636 701',
    sealEmblem: 'coast',
    symbolEmoji: '🚣',
  },
  Pudukkottai: {
    name: 'Pudukkottai',
    tagline: 'Rock-Cut Jain & Chola Frescoes',
    motto: 'ANCIENT CAVE ART & LIVING MONUMENTS',
    coordinates: "10°23'N 78°49'E",
    pinPrefix: '622 001',
    sealEmblem: 'temple',
    symbolEmoji: '🎨',
  },
  Tiruchirappalli: {
    name: 'Tiruchirappalli',
    tagline: 'Cauvery Rockfort Stronghold',
    motto: 'MONUMENTAL ISLAND OF SRIRANGAM',
    coordinates: "10°47'N 78°41'E",
    pinPrefix: '620 001',
    sealEmblem: 'fort',
    symbolEmoji: '🚩',
  },
};

export function getDistrictCrest(districtName: string): DistrictCrestInfo {
  // Case-insensitive lookup or partial match
  const normalized = districtName.trim();
  for (const [key, value] of Object.entries(DISTRICT_CRESTS)) {
    if (key.toLowerCase() === normalized.toLowerCase()) {
      return value;
    }
  }

  // Fallback generic Tamil Nadu district crest
  return {
    name: districtName,
    tagline: 'Tamil Nadu Heritage Gem',
    motto: 'VERIFIED EXPEDITION CODEX · TAMIL NADU',
    coordinates: "11°07'N 78°39'E",
    pinPrefix: '600 001',
    sealEmblem: 'temple',
    symbolEmoji: '🧭',
  };
}
