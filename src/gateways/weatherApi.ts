import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "08db7e8c08cf521b308406b429394ef0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  fetchCurrentWeather: async (city: string) => {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
     console.log("🌤️ Weather API Response:", response.data);
    return response.data;
  },



  fetchForecast: async (city: string) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });
    console.log("🌤️ Weather API Response:", response.data);
    return response.data;
  },

  fetchCurrentWeatherByCoords: async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: "metric" },
    });
    console.log("📍 Local Weather:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching local weather:", error.message);
    throw new Error("Unable to fetch local weather data");
  }
},

fetchCitySuggestions: async (query: string) => {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
    params: { q: query, limit: 5, appid: API_KEY },
  });
  return response.data;
},


};
export const fetchExampleCities = createAsyncThunk(
  "weather/fetchExampleCities",
  async (_, { rejectWithValue }) => {
    try {
      const cities = ["New York", "London", "Tokyo", "Paris"];
      const results = await Promise.all(
        cities.map(async (city) => {
          const current = await weatherApi.fetchCurrentWeather(city);
          return current;
        })
      );
      return results;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);