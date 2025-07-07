import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      // إجراء reverse geocoding
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then((res) => res.json())
        .then((data) => {
          const address = data.address || {};
          onLocationSelect({
            streetName: address.road || "",
            city: address.city || address.town || address.village || "",
            state: address.state || "",
            country: address.country || "",
            countryCode: address.country_code?.toUpperCase() || "",
          });
        });
    },
  });

  return position === null ? null : <Marker position={position} icon={markerIcon} />;
}

const LocationPicker = ({ onLocationSelect }) => {
  return (
    <div className="h-[300px] w-full my-4 border rounded overflow-hidden">
      <MapContainer center={[24.7136, 46.6753]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
