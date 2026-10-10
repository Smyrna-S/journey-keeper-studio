export interface Coordinates {
  lat: number;
  lng: number;
}

export const DESTINATION_COORDINATES: Record<string, Coordinates> = {
  // Nature
  N01: { lat: 11.4286, lng: 79.7917 }, // Pichavaram Mangroves (Cuddalore)
  N02: { lat: 11.2485, lng: 78.3387 }, // Kolli Hills (Namakkal)
  N03: { lat: 9.7119, lng: 77.4019 },  // Meghamalai (Theni)
  N04: { lat: 10.3262, lng: 76.9554 }, // Valparai (Coimbatore)
  N05: { lat: 8.9291, lng: 77.2689 },  // Courtallam (Tenkasi)
  N06: { lat: 10.2381, lng: 77.4892 }, // Kodaikanal (Dindigul)
  N07: { lat: 12.6000, lng: 78.8500 }, // Javadi Hills (Tiruvannamalai)
  N08: { lat: 11.5623, lng: 76.5345 }, // Mudumalai National Park (Nilgiris)
  N09: { lat: 10.3000, lng: 79.8667 }, // Point Calimere (Nagapattinam)
  N10: { lat: 8.6500, lng: 77.4167 },  // Manimuthar (Tirunelveli)

  // Culture & Heritage
  C01: { lat: 10.7828, lng: 79.1318 }, // Brihadeeswarar Temple (Thanjavur)
  C02: { lat: 12.6269, lng: 80.1927 }, // Mahabalipuram Shore Temples (Chengalpattu)
  C03: { lat: 9.9195, lng: 78.1193 },  // Meenakshi Amman Temple (Madurai)
  C04: { lat: 10.1747, lng: 78.7842 }, // Chettinad Mansions (Sivaganga)
  C05: { lat: 12.8342, lng: 79.7036 }, // Kanchipuram Temples (Kanchipuram)

  // Food & Culinary Trails
  F01: { lat: 9.9252, lng: 78.1198 },  // Madurai Street Food Trail (Madurai)
  F02: { lat: 11.0168, lng: 76.9558 }, // Coimbatore Kongu Kitchens (Coimbatore)
  F03: { lat: 8.7139, lng: 77.7567 },  // Tirunelveli Halwa Route (Tirunelveli)
  F04: { lat: 10.7870, lng: 79.1378 }, // Thanjavur Royal Feast & Degree Coffee (Thanjavur)
  F05: { lat: 10.3673, lng: 77.9803 }, // Dindigul Thalappakatti Trail (Dindigul)

  // Adventure
  A01: { lat: 11.7753, lng: 78.2093 }, // Yercaud Skywalk & Treks (Salem)
  A02: { lat: 11.2800, lng: 78.3600 }, // Kolli Hills 70 Hairpin Ride (Namakkal)
  A03: { lat: 12.1182, lng: 77.7769 }, // Hogenakkal Falls & Coracle (Dharmapuri)
  A04: { lat: 10.3550, lng: 76.9800 }, // Valparai Anamalai Safari (Coimbatore)
  A05: { lat: 10.4850, lng: 76.8375 }, // Topslip & Elephant Camp (Coimbatore)
};

export function getDestinationCoordinates(id: string): Coordinates {
  return DESTINATION_COORDINATES[id] || { lat: 11.1271, lng: 78.6569 }; // Center of Tamil Nadu default
}
