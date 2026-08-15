import { useWeatherQuery } from "@/hooks/use-weather";
import type { Coords } from "../../types";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};

const WeatherInfo = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data } = useWeatherQuery({ lat, lon });

  return (
    <Card title="Details" childrenClassName="flex flex-col items-center">
      <span>Country Name:</span>
      <h2 className="font-semibold text-xl">{data?.name}</h2>
      <div className="flex flex-col items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data?.main.temp)}℃
        </h2>
        <WeatherIcon
          src={`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`}
          iconSize="size-16"
        />
        <h3 className="capitalize text-md">{data?.weather[0].description}</h3>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-md">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(data?.dt * 1000))}{" "}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p> {data?.main.humidity} %</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <p>
            {" "}
            {Math.round(data?.main.feels_like)} {"\u00B0"}C
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind </p>
          <p>{data?.wind.speed} mph</p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherInfo;
