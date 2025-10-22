import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "08db7e8c08cf521b308406b429394ef0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherState {
  currentWeather: any | null;
  forecast: any[];
  favorites: string[];
  history: string[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  favorites: [],
  history: [],
  loading: false,
  error: null,
};

// Async thunk to fetch weather
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const current = await axios.get(`${BASE_URL}/weather`, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });
       console.log("✅ Current response:", current.data);
      const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });
         console.log("✅ Forecast count:", forecastRes.data.list.length);
      // Save to history in AsyncStorage
      const storedHistory = (await AsyncStorage.getItem("history")) || "[]";
      const history = JSON.parse(storedHistory);
      if (!history.includes(city)) history.push(city);
      await AsyncStorage.setItem("history", JSON.stringify(history));

      return { current: current.data, forecast: forecastRes.data.list, city };
    } catch (err: any) {
        console.log("❌ Fetch error:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) state.favorites.push(action.payload);
      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    loadFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    loadHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.current;
        state.forecast = action.payload.forecast;
        if (!state.history.includes(action.payload.city)) state.history.push(action.payload.city);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToFavorites, loadFavorites, loadHistory } = weatherSlice.actions;
export default weatherSlice.reducer;