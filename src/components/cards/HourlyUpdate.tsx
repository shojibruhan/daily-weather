// import { weatherAPI } from "@/api/weatherClass";
import { useForeCastQuery } from "@/hooks/use-weather";
import type { Coords } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type Props = {
  coords: Coords;
};

const HourlyUpdate = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data: forCastQuery } = useForeCastQuery({ lat, lon });
  console.log("data from ForCast:", forCastQuery);
  const chartData = forCastQuery.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  // console.log("chartData: ", chartData);

  //   return (
  //     <div className="space-y-4">
  //       <div className="flex items-center justify-around">
  //         <h1 className="text-xl font-bold tracking-tight">Hourly Update</h1>
  //         <button className="size-10 rounded-md bg-amber-100 shadow-md"></button>
  //       </div>
  //     </div>
  //   );

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

        {/* <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
};

export default HourlyUpdate;
