import { useSuspenseQuery } from "@tanstack/react-query";
import getWeather from "../../api/api";
import type { Coords } from "../../types";
import Card from "./Card";

type Props = {
  coords: Coords;
};

const AdditionaInfo = ({ coords }: Props) => {
  const { lat, lon } = coords;

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: lat, lon: lon }),
  });
  return (
    <Card title="Addition Weather Info" childrenClassName="flex flex-col">
      {rows.map(({ label, value }) => (
        <div className="flex justify-between" key={label}>
          <span>{label}</span>
          <span>
            <FormateComponent value={value} number={data?.sys[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
};

const FormateComponent = ({
  value,
  number,
}: {
  value: string;
  number: number | string;
}) => {
  if (
    typeof number === "number" &&
    (value === "sunrise" || value === "sunset")
  ) {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return number;
};

const rows = [
  {
    label: "country",
    value: "country",
  },
  {
    label: "sunrise",
    value: "sunrise",
  },
  {
    label: "sunset",
    value: "sunset",
  },
] as const;

export default AdditionaInfo;
