import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
  return (
    <Select
      value={mapType}
      onValueChange={(value) => {
        if (value !== null) {
          setMapType(value);
        }
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Weather">
          {types.find((t) => t.value === mapType)?.label ?? "Select map type"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="z-10000001">
        <SelectGroup>
          {types.map((t) => (
            <SelectItem key={t.value} value={t.value} className="capitalize">
              {t.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MapTypeDropdown;

// const types = [
//   "clouds_new",
//   "precipitation_new",
//   "pressure_new",
//   "wind_new",
//   "temp_new",
// ];

const types = [
  { value: "clouds_new", label: "Clouds" },
  { value: "precipitation_new", label: "Precipitation" },
  { value: "pressure_new", label: "Pressure" },
  { value: "wind_new", label: "Wind" },
  { value: "temp_new", label: "Temperature" },
];
