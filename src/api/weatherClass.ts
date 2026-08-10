import type { ForecastDataType } from "@/schemas/forcastSchema";
import type { ReverseGeocodeDataType } from "@/schemas/reverseGeoCodeSchema";
import { type WeatherDataType } from "@/schemas/weatherSchemas";
import type { Coords } from "@/types";
import { API_CONFIG } from "./config";

const { BASE_URL, GEO_URL, API_KEY, UNITS } = API_CONFIG;
class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      apiId: API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API Error ${response.statusText}`);
    }
    const data = response.json();
    return data;
  }

  async getCurrentWeather({ lat, lon }: Coords): Promise<WeatherDataType> {
    const url = this.createUrl(`${BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      UNITS,
    });
    return this.fetchData<WeatherDataType>(url);
  }
  async getForecast({ lat, lon }: Coords): Promise<ForecastDataType> {
    const url = this.createUrl(`${BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      UNITS,
    });
    return this.fetchData<ForecastDataType>(url);
  }
  async reverseGeoCode({
    lat,
    lon,
  }: Coords): Promise<ReverseGeocodeDataType[]> {
    const url = this.createUrl(`${GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
    return this.fetchData<ReverseGeocodeDataType[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
