import { weatherApi } from "../weatherApi"; 

export const weatherRepositoryImpl = {
  async getWeatherByCity(city: string) {
    const data = await weatherApi.fetchCurrentWeather(city);
    return mapToEntity(data);
  },

  async getWeatherByCoords(lat: number, lon: number) {
    const data = await weatherApi.fetchCurrentWeatherByCoords(lat, lon);
    return mapToEntity(data);
  },

  async getForecast(city: string) {
    const data = await weatherApi.fetchForecast(city);
    return data.list.map((item: any) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      weather: item.weather[0].main,
    }));
  },
};

// Convert raw API data to a cleaner domain model
const mapToEntity = (data: any) => ({
  city: data.name,
  description: data.weather[0].description,
  temperature: data.main.temp,
  feelsLike: data.main.feels_like,
  humidity: data.main.humidity,
  wind: data.wind.speed,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
});