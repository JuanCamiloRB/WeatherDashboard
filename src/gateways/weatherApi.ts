import axios from "axios";
import { store } from "../stores/weatherStore"; // Acceso al estado global

const API_KEY = "08db7e8c08cf521b308406b429394ef0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  //  getting the weather of the city by name
  fetchCurrentWeather: async (city: string) => {
    const unit = store.getState().settings.unit;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: unit },
    });

    const data = response.data;

    return {
      name: data.name,
      weather: data.weather,
      main: data.main,
      wind: data.wind,
      sys: data.sys,
      timezone: data.timezone,
      coord: data.coord,
    };
  },

  //  getting data by coord
  fetchCurrentWeatherByCoords: async (lat: number, lon: number) => {
    const unit = store.getState().settings.unit;
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: { lat, lon, appid: API_KEY, units: unit },
      });
      const data = response.data;
      return {
        name: data.name,
        weather: data.weather,
        main: data.main,
        wind: data.wind,
        sys: data.sys,
        timezone: data.timezone,
        coord: data.coord,
      };
    } catch (error: any) {
      console.error(" Error fetching local weather:", error.message);
      throw new Error("Unable to fetch local weather data");
    }
  },

  //  getting forecast for 5 days
  fetchForecast: async (city?: string, lat?: number, lon?: number) => {
  const unit = store.getState().settings.unit; // °C / °F
  const params: any = { appid: API_KEY, units: unit };

  if (lat != null && lon != null) {
    // if there is coord we can use it
    params.lat = lat;
    params.lon = lon;
  } else if (city && city.trim().length > 0) {
    //  if dont coord we use the name of the cityu¡
    params.q = city.trim();
  } else {
    throw new Error(" No valid location provided for forecast");
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, { params });
    console.log("🌤️ Forecast API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(" Forecast request failed:", error.response?.data || error.message);
    throw error;
  }
},

  //  autocomplete cities
  fetchCitySuggestions: async (query: string) => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
      params: { q: query, limit: 5, appid: API_KEY },
    });
    return response.data;
  },
};