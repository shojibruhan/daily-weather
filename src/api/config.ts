import type { Config } from "@/types";

export const API_CONFIG: Config = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_URL: "https://api.openweathermap.org/geo/1.0/",
  API_KEY: import.meta.env.VITE_API_KEY,
  UNITS: "metric",
};
