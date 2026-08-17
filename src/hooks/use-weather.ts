import { weatherAPI } from "@/api/weatherClass";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
  weather: (coords: Coords) => ["weather", coords] as const,
  forecast: (coords: Coords) => ["forecast", coords] as const,
  location: (coords: Coords) => ["location", coords] as const,
  airPollution: (coords: Coords) => ["pollution", coords] as const,
} as const;

export const useWeatherQuery = (coords: Coords) => {
  return useSuspenseQuery({
    queryKey: WEATHER_KEY.weather(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => weatherAPI.getCurrentWeather(coords),
  });
};

export const useForeCastQuery = (coords: Coords) => {
  return useSuspenseQuery({
    queryKey: WEATHER_KEY.forecast(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => weatherAPI.getForecast(coords),
  });
};

export const useReverseLocation = (coords: Coords) => {
  return useSuspenseQuery({
    queryKey: WEATHER_KEY.location(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => weatherAPI.reverseGeoCode(coords),
  });
};

export const useAirPollution = (coords: Coords) => {
  return useSuspenseQuery({
    queryKey: WEATHER_KEY.airPollution(coords ?? { lat: 0, lon: 0 }),
    queryFn: () => weatherAPI.getAirPollution(coords),
  });
};
