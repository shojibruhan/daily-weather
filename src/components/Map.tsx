import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { Coords } from "../types";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

const Map = ({ coords, onMapClick }: Props) => {
  const { lat, lon } = coords;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "1400px", height: "500px", zIndex: "-100" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

const MapClick = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}): null => {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });

  return null;
};

export default Map;
