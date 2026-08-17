import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { getGeoCodeLocation } from "./api/api";
import HourlyForcast from "./components/cards/HourlyForcast";
import HourlyUpdateCharts from "./components/cards/HourlyUpdateCharts";
import Summary from "./components/cards/Summary";
import WeatherInfo from "./components/cards/WeatherInfo";
import WeeklyForcast from "./components/cards/WeeklyForcast";
import DarkLightToggle from "./components/DarkLightToggle";
import LocationDropdown from "./components/dropdown/LocationDropdown";
import MapTypeDropdown from "./components/dropdown/MapTypeDropdown";
import Map from "./components/Map/Map";
import MapLegend from "./components/Map/MapLegend";
import MobileHeader from "./components/MobileHeader";
import RegionDetails from "./components/RegionDetails";
import SidePanel from "./components/SidePanel";
import RegionDetailsSkeleton from "./components/skeleton/RegionDetailsSkeleton";
import SummarySkeleton from "./components/skeleton/SummarySkeleton";
import WeatherInfoSkeleton from "./components/skeleton/WeatherInfoSkeleton";
import WeeklyForcastSkeleton from "./components/skeleton/WeeklyForcastSkeleton";
import type { Coords } from "./types";

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({
    lat: 23.8103,
    lon: 90.4125,
  });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const { data: geoCodeData } = useQuery({
    queryKey: ["geoCode", location],
    queryFn: () => getGeoCodeLocation(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation("custom");
  };
  const coords =
    location === "custom"
      ? coordinates
      : { lat: geoCodeData?.[0].lat ?? 10, lon: geoCodeData?.[0].lon ?? 10 };

  return (
    <>
      <MobileHeader
        setIsSidePanelOpen={setIsSidePanelOpen}
        isSidePanelOpen={isSidePanelOpen}
      />
      <div className="flex flex-col gap-8  top-0 p-0 md:mt-4 md:p-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen">
        {/* top drop down menu */}

        <div className="sticky bg-background z-1001 flex flex-col top-0 p-4 w-full text-xs md:text-2xl md:flex-row gap-1 md:gap-8 justify-between">
          <div className="flex flex-col xs:flex-row gap-2  xs:gap-4">
            <h1 className="text-xs md:text-2xl font-semibold">Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col xs:flex-row  gap-2 xs:gap-4">
            <h1 className="text-xs md:text-2xl font-semibold whitespace-nowrap">
              Map Type:{" "}
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="hidden xs:block">
            <DarkLightToggle />
          </div>
          {!isSidePanelOpen && (
            <button onClick={() => setIsSidePanelOpen(true)}>
              <img
                src="burger-bar.png"
                className="size-6 invert ml-auto mr-10 hidden md:block lg:hidden"
              />
            </button>
          )}
        </div>

        {/* Card with map  */}
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 space-x-2 2xl:grid-cols-4 2xl:grid-rows-4">
          {/* map body */}
          <div className="relative col-span-1 md:col-span-2 gap-2 2xl:grid-cols-4 2xl:grid-rows-2">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>
          {/* <MapBody coords={coords} onMapClick={onMapClick} mapType={mapType} /> */}

          {/* Details Card  */}
          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<WeatherInfoSkeleton />}>
              <WeatherInfo coords={coords} />
            </Suspense>
          </div>

          {/* summery card */}
          <div className="col-span-1">
            <Suspense fallback={<SummarySkeleton />}>
              <Summary coords={coords} />
            </Suspense>
          </div>

          {/* Region Details */}
          <div className="col-span-1">
            <Suspense fallback={<RegionDetailsSkeleton />}>
              <RegionDetails coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-2">
            <HourlyForcast coords={coords} />
          </div>
          <div className="col-span-2">
            <HourlyUpdateCharts coords={coords} />
          </div>
          <div className="col-span-2">
            <Suspense fallback={<WeeklyForcastSkeleton />}>
              <WeeklyForcast coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
