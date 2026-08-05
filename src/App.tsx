import { useState } from "react";
import AdditionaInfo from "./components/cards/AdditionaInfo";
import Summary from "./components/cards/Summary";
import WeatherInfo from "./components/cards/WeatherInfo";
import LocationDropdown from "./components/dropdown/LocationDropdown";
import Map from "./components/Map";
import type { Coords } from "./types";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 23.8103, lon: 90.4125 });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    console.log("mouse click");
  };
  console.log(coords);

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown />
      <Map coords={coords} onMapClick={onMapClick} />
      <WeatherInfo coords={coords} />
      <Summary coords={coords} />
      <AdditionaInfo coords={coords} />
    </div>
  );
}

export default App;
