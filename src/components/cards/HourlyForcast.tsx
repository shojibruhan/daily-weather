import { useForeCastQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};

const HourlyForcast = ({ coords }: Props) => {
  const { lat, lon } = coords;
  const { data } = useForeCastQuery({ lat, lon });

  const timeFormater = (time: number): string => {
    return `${new Date(time * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <Card
      title="Hourly Forcast"
      className="text-center items-center"
      childrenClassName="flex gap-12 overflow-x-scroll sm:overflow-hidden"
    >
      {data.list.slice(0, 9).map((hour) => {
        return (
          <div key={hour.dt} className="flex flex-col gap-2 items-center">
            <p className="text-sm">{timeFormater(hour.dt)}</p>
            <WeatherIcon src={hour.weather[0].icon} />
            <p>{Math.round(hour.main.temp)}℃</p>
          </div>
        );
      })}
    </Card>
  );
};

export default HourlyForcast;
