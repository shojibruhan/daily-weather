import { useSuspenseQuery } from "@tanstack/react-query";
import getWeather from "../../api/api";
import type { Coords } from "../../types";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};
const Summary = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat, lon }),
  });

  return (
    <Card title="Weather Summary" childrenClassName="flex flex-col gap-4">
      <p className="text-center">
        Date: {new Date(data.dt * 1000).toLocaleDateString()}
      </p>
      <p className="text-center">
        {new Date(data.dt * 1000).toLocaleDateString(undefined, {
          weekday: "long",
        })}
      </p>

      <div className="flex justify-between">
        <h3>{data.weather[0].main}</h3>
        <WeatherIcon
          src={`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`}
        />
      </div>

      <p>Overall Condition: {data?.weather[0].description}</p>
      <div>
        <h2 className="text-center font-semibold text-amber-300">
          Wind Condition
        </h2>
        <div className="flex justify-around">
          <p>Wind Speed: {data?.wind.speed}</p>
          <p>Wind Deg: {data?.wind.deg}</p>
          <p>Wind Gust: {data?.wind.gust}</p>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
