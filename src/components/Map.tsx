import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { Coords } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

const Map = ({ coords, onMapClick }: Props) => {
  const { lat, lon } = coords;

  return (
    <MapContainer
      // key={`${coords.lat}, ${coords.lon}`}
      center={[lat, lon]}
      zoom={5}
      style={{ width: "1400px", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}

export default Map;
