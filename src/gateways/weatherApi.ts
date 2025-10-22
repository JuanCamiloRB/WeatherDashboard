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
};