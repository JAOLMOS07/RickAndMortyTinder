'use client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map() {
  const [markers, setMarkers] = useState([]);

  const initialCenter = [4.6097, -74.0817];

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const newMarker = {
      position: [lat, lng],
      popupText: `Marcador en (${lat.toFixed(4)}, ${lng.toFixed(4)})`,};
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  return (
    <MapContainer
      center={initialCenter}
      zoom={6}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents onClick={handleMapClick} />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={customIcon}>
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e); 
    },
    
  });
  return null;
};
