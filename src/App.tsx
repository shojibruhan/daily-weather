import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGeoCodeLocation } from "./api/api";
import AdditionaInfo from "./components/cards/AdditionaInfo";
import Summary from "./components/cards/Summary";
import WeatherInfo from "./components/cards/WeatherInfo";
import LocationDropdown from "./components/dropdown/LocationDropdown";
import MapTypeDropdown from "./components/dropdown/MapTypeDropdown";
import Map from "./components/Map";
import type { Coords } from "./types";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 23.8103,
    lon: 90.4125,
  });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");

  const { data: geoCodeData } = useQuery({
    queryKey: ["geoCode", location],
    queryFn: () => getGeoCodeLocation(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation("custom");
    console.log("mouse click");
  };
  const coords =
    location === "custom"
      ? coordinates
      : { lat: geoCodeData?.[0].lat ?? 10, lon: geoCodeData?.[0].lon ?? 10 };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold text-amber-50">Location: </h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold text-amber-50">Map Type: </h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
      <WeatherInfo coords={coords} />
      <Summary coords={coords} />
      <AdditionaInfo coords={coords} />
    </div>
  );
}

export default App;
