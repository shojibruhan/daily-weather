import { MapStyle, MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { Coords } from "../../types";
const API_KEY = import.meta.env.VITE_API_KEY;
const MAP_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

const Map = ({ coords, onMapClick, mapType }: Props) => {
  const { lat, lon } = coords;

  return (
    <MapContainer
      // key={`${coords.lat}, ${coords.lon}`}
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <MapTileLayer />
      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
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

const MapTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: MapStyle.DATAVIZ.DARK,
      apiKey: MAP_API_KEY,
    });
    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

export default Map;
