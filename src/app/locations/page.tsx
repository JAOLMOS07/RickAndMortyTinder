'use client'
import Map from "@/components/maps/map";
import 'leaflet/dist/leaflet.css';
export default function Home() {
  return (
    <div>
      <h1>Mapa de Colombia</h1>
      <Map  />
    </div>
  );
}