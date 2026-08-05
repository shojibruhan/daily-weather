import { GeoCodeSchema } from "@/schemas/GeoCodeSchema";
import { WeatherSchema } from "../schemas/weatherSchemas";

const API_KEY = import.meta.env.VITE_API_KEY;

const getWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`,
  );

  const data = await response.json();

  return WeatherSchema.parse(data);
};

export default getWeather;

export const getGeoCodeLocation = async (location: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );
  const data = await response.json();

  return GeoCodeSchema.parse(data);
};
