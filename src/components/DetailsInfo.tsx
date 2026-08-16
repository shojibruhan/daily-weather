import { getGeoCodeLocation } from "@/api/api";
import type { Coords } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import MapBody from "./MapBody";
import RegionDetails from "./RegionDetails";
import HourlyForcast from "./cards/HourlyForcast";
import HourlyUpdateCharts from "./cards/HourlyUpdateCharts";
import Summary from "./cards/Summary";
import WeatherInfo from "./cards/WeatherInfo";
import RegionDetailsSkeleton from "./skeleton/RegionDetailsSkeleton";
import SummarySkeleton from "./skeleton/SummarySkeleton";
import WeatherInfoSkeleton from "./skeleton/WeatherInfoSkeleton";

const DetailsInfo = () => {
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
  };
  const coords =
    location === "custom"
      ? coordinates
      : { lat: geoCodeData?.[0].lat ?? 10, lon: geoCodeData?.[0].lon ?? 10 };
  return (
    <>
      <MapBody coords={coords} onMapClick={onMapClick} mapType={mapType} />

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
          {/* <AdditionaInfo coords={coords} /> */}
          <RegionDetails coords={coords} />
        </Suspense>
      </div>
      <div className=" col-span-2">
        <HourlyForcast coords={coords} />
      </div>
      <div className="col-span-2">
        <HourlyUpdateCharts coords={coords} />
      </div>
    </>
  );
};

export default DetailsInfo;
