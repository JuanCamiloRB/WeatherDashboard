import { weatherApi } from "../weatherApi";

// model for the type weather
export interface WeatherEntity {
  city: string;
  coord: {
    lat: number;
    lon: number;
  };
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

//  implementing repo
export const weatherRepositoryImpl = {
  async getWeatherByCity(city: string): Promise<WeatherEntity> {
    const data = await weatherApi.fetchCurrentWeather(city);
    return mapToEntity(data);
  },

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherEntity> {
    const data = await weatherApi.fetchCurrentWeatherByCoords(lat, lon);
    return mapToEntity(data);
  },

  async getForecast(city?: string, lat?: number, lon?: number) {
    const data = await weatherApi.fetchForecast(city, lat, lon);
    return data.list.map((item: any) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      weather: item.weather[0].main,
    }));
  },
};

// conver data into clean model
const mapToEntity = (data: any): WeatherEntity => ({
  city: data.name ?? "Unknown",
  description: data.weather?.[0]?.description ?? "N/A",
  temperature: data.main?.temp ?? 0,
  feelsLike: data.main?.feels_like ?? 0,
  humidity: data.main?.humidity ?? 0,
  wind: data.wind?.speed ?? 0,
  sunrise: data.sys?.sunrise ?? 0,
  sunset: data.sys?.sunset ?? 0,
  timezone: data.timezone ?? 0,
  coord: {
    lat: data.coord?.lat ?? 0,
    lon: data.coord?.lon ?? 0,
  },
});