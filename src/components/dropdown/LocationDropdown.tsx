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
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const LocationDropdown = ({ location, setLocation }: Props) => {
  return (
    <Select
      value={location}
      onValueChange={(value) => {
        if (value !== null) {
          setLocation(value);
        }
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {locations.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;

const locations = [
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Lisbon",
  "Dhaka",
];
