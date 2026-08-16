import { useForeCastQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};

const HourlyTemperature = ({ coords }: Props) => {
  const { lat, lon } = coords;
  const { data } = useForeCastQuery({ lat, lon });
  console.log("Hourly temperature:", data);
  const timeFormater = (time: number): string => {
    return `${new Date(time * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
    })}`;
  };
  return (
    <Card title="Daily Forcast" className="text-center">
      {data.list.slice(0, 9).map((item) => {
        return (
          <div key={item.dt} className="flex justify-between text-sm">
            <p>{timeFormater(item.dt)}</p>
            <WeatherIcon src={item.weather[0].icon} iconSize="size-8" />
            <p>{Math.round(item.main.temp)}℃</p>
            <p className="text-gray-500/75">
              {Math.round(item.main.temp_max)}℃
            </p>
            <p className="text-gray-500/75">
              {Math.round(item.main.temp_min)}℃
            </p>
          </div>
        );
      })}
    </Card>
  );
};

export default HourlyTemperature;
