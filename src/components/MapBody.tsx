import type { Coords } from "@/types";
import Map from "./Map/Map";
import MapLegend from "./Map/MapLegend";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
};

const MapBody = ({ coords, onMapClick, mapType }: Props) => {
  return (
    <div className="relative col-span-1 md:col-span-2 gap-2 2xl:grid-cols-4 2xl:grid-rows-2">
      <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
      <MapLegend mapType={mapType} />
    </div>
  );
};

export default MapBody;
