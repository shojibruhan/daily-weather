import { useForeCastQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";

import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coords: Coords;
};

type DailyForcast = {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
};

const WeeklyForcast = ({ coords }: Props) => {
  const { lat, lon } = coords;
  const { data } = useForeCastQuery({ lat, lon });

  const dailyForcast = data.list.reduce(
    (acc, forcast) => {
      const date = new Date(forcast.dt * 1000).toLocaleDateString(undefined, {
        dateStyle: "full",
      });
      if (!acc[date]) {
        acc[date] = {
          temp_min: forcast.main.temp_min,
          temp_max: forcast.main.temp_max,
          humidity: forcast.main.humidity,
          wind: forcast.wind.speed,
          weather: forcast.weather[0],
          date: forcast.dt,
        };
      } else {
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forcast.main.temp_max,
        );
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forcast.main.temp_min,
        );
      }

      return acc;
    },
    {} as Record<string, DailyForcast>,
  );

  const nextDays = Object.values(dailyForcast).slice(0, 8);
  const timeFormater = (time: number): string => {
    return `${new Date(time * 1000).toLocaleDateString(undefined, {
      // dateStyle: "medium",

      weekday: "short",
    })}`;
  };

  return (
    <Card title="This Week Forcast" className="text-center col-span-1">
      <div className="flex justify-between text-md mb-2 dark:text-amber-100 ">
        <p>Day</p>
        <p>Weather</p>
        <p>Max. Temp ℃</p>
        <p>Min. Temp ℃</p>
        <p>Humidity (%)</p>
        <p>Wind (m/s)</p>
      </div>
      {nextDays.map((item) => {
        return (
          <div key={item.date} className="flex justify-between text-sm">
            <p className="w-6">{timeFormater(item.date)}</p>
            <WeatherIcon src={item.weather.icon} iconSize="size-8" />
            <p>{Math.round(item.temp_max)}℃</p>
            <p>{Math.round(item.temp_min)}℃</p>
            <p>{Math.round(item.humidity)}%</p>
            <p>{Math.round(item.wind)} m/s</p>
          </div>
        );
      })}
    </Card>
  );
};

export default WeeklyForcast;
