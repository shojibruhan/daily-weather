import { useWeatherQuery } from "@/hooks/use-weather";
import type { Coords } from "../../types";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};
const Summary = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data } = useWeatherQuery({ lat, lon });
  return (
    <Card
      title="Weather Summary"
      className="text-center"
      childrenClassName="flex flex-col gap-4"
    >
      <p className="text-center">
        Date:{" "}
        {new Date(data.dt * 1000).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </p>
      <p className="text-center">
        {new Date(data.dt * 1000).toLocaleDateString(undefined, {
          weekday: "long",
        })}
      </p>

      <div className="flex justify-between">
        <h3>{data.weather[0].main}</h3>
        <WeatherIcon src={data.weather[0].icon} />
      </div>

      <p>Overall Condition: {data?.weather[0].description}</p>
      <div>
        <h2 className="text-center font-semibold dark:text-amber-300">
          Temperature Condition
        </h2>
        <div className="flex justify-around py-1">
          <div className="flex flex-col">
            <p>Max. Temp:</p>
            <p> {data?.main.temp_max}℃</p>
          </div>
          <div className="flex flex-col">
            <p>Min. Temp: </p>
            <p> {data?.main.temp_min}℃</p>
          </div>
          <div className="flex flex-col">
            <p>Pressure:</p>
            <p> {data?.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
