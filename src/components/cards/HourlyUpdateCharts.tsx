import { useForeCastQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import Card from "./Card";

type Props = {
  coords: Coords;
};

const HourlyUpdateCharts = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data: forCastQuery } = useForeCastQuery({ lat, lon });

  const chartData = forCastQuery.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-50 w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart width={400} height={400} data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              {/* Tooltip from recharts */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="gird grid-cols-4 gap-2">
                          <div className="flex flex-cols">
                            <span className="uppercase text-muted-foreground text-[0.7rem]">
                              Temperature{" "}
                            </span>
                            <span className="px-1"> {payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col">
                            <span className=" uppercase text-muted-foreground text-[0.7rem]">
                              Feels Like{" "}
                            </span>
                            <span className="px-1"> {payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyUpdateCharts;
