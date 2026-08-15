import { useWeatherQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";
import { Clock, Compass, Gauge, Globe, Sunrise, Sunset } from "lucide-react";
import Card from "./cards/Card";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  coords: Coords;
};

const RegionDetails = ({ coords }: Props) => {
  const { lat, lon } = coords;
  const { data } = useWeatherQuery({ lat, lon });

  const formatTime = (time: number): string => {
    return new Date(time * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatTimezone = (timezoneShiftSeconds: number) => {
    const totalMinutes = timezoneShiftSeconds / 60;
    const sign = totalMinutes >= 0 ? "+" : "-";
    const absMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    return `UTC${sign}${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const rows = [
    {
      label: "Country",
      value: `${data.sys.country}`,
      icon: Globe,
      color: "text-blue-500",
    },
    {
      label: "TimeZone",
      value: formatTimezone(data.timezone),
      icon: Clock,
      color: "text-amber-500",
    },
    {
      label: "Sunrise",
      value: formatTime(data.sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      label: "Sunset",
      value: formatTime(data.sys.sunset),
      icon: Sunset,
      color: "text-red-300",
    },
    {
      label: "Wind Direction",
      // value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      value: `${data.wind.deg}°`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      label: "Pressure",
      value: `${data.main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ] as const;

  return (
    // <footer className="border-t backdrop-blur-lg py-6 bg-background/60 bg-linear-to-br from-card to-card/60">
    //   <div className="container mx-auto text-center  text-gray-600">
    //     <p>footer</p>
    //   </div>
    // </footer>
    <Card title="Region Details" className="text-center">
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3 border rounded-lg p-4"
              >
                <row.icon className={`size-5 ${row.color}`} />
                <div className="text-left">
                  <p className="text-sm font-medium leading-none">
                    {row.label}
                  </p>
                  <p className="text-sm text-muted-foreground pt-0.5">
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RegionDetails;
