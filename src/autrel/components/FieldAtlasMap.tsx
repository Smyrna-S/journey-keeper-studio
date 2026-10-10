import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Destination } from '../types';
export default function FieldAtlasMap({ destinations, onSelect }: { destinations: Destination[]; onSelect: (d: Destination) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { center: [10.7,78.5], zoom:7, scrollWheelZoom:false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom:18 }).addTo(map);
    mapRef.current = map; markersRef.current = L.layerGroup().addTo(map);
    return () => { map.remove(); mapRef.current = null; markersRef.current = null; };
  }, []);
  useEffect(() => {
    const layer = markersRef.current;
    if (!layer) return;
    layer.clearLayers();
    destinations.forEach(d => { if (!d.coordinates) return;
      const marker = L.marker([d.coordinates.lat,d.coordinates.lng], { icon:L.divIcon({ className:'', html:'<div class="map-pin"></div>', iconSize:[25,25], iconAnchor:[12,25] }), title:d.destination }).addTo(layer);
      marker.bindTooltip(`${d.destination} · ${d.category}`); marker.on('click', () => onSelect(d));
    });
  }, [destinations,onSelect]);
  return <div ref={ref} className="atlas-map" role="region" aria-label="Interactive Tamil Nadu destination map" />;
}
