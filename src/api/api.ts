import { AirPollutionSchema } from "@/schemas/airPollutionSchema";
import { GeoCodeSchema } from "@/schemas/GeoCodeSchema";
import { WeatherSchema } from "../schemas/weatherSchemas";
import { API_CONFIG } from "./config";

// const API_KEY = import.meta.env.VITE_API_KEY;

const { BASE_URL, GEO_URL, API_KEY } = API_CONFIG;

const getWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`,
  );

  const data = await response.json();

  return WeatherSchema.parse(data);
};

export default getWeather;

export const getGeoCodeLocation = async (location: string) => {
  const response = await fetch(
    `${GEO_URL}/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );
  const data = await response.json();

  return GeoCodeSchema.parse(data);
};

export const getAirPollution = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  const data = await response.json();

  return AirPollutionSchema.parse(data);
};
