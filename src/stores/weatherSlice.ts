import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { weatherApi } from "../gateways/weatherApi";

export interface WeatherState {
  currentWeather: any | null;
  forecast: any[];
  favorites: string[];
  history: string[];
  suggestions: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  favorites: [],
  history: [],
  suggestions: [], 
  loading: false,
  error: null,
};

//  searching weather by coord
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (arg: string | { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      let current, forecast, cityName = "";

      if (typeof arg === "string") {
        current = await weatherApi.fetchCurrentWeather(arg);
        forecast = await weatherApi.fetchForecast(arg);
        cityName = current.name;
      } else {
        const { lat, lon } = arg;
        current = await weatherApi.fetchCurrentWeatherByCoords(lat, lon);
        forecast = await weatherApi.fetchForecast(`${lat},${lon}`);
        cityName = current.name;
      }

      // saving data locally
      const storedHistory = (await AsyncStorage.getItem("history")) || "[]";
      const history = JSON.parse(storedHistory);
      if (!history.includes(cityName)) history.push(cityName);
      await AsyncStorage.setItem("history", JSON.stringify(history));

      return { current, forecast: forecast.list || [], city: cityName };
    } catch (err: any) {
      console.log(" Error getting the weather:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

// popular cities
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
      console.log(" error getting examples:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "weather/fetchCitySuggestions",
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await weatherApi.fetchCitySuggestions(query);

      // Remove duplicates based on name + country
      const uniqueCities = data.filter(
        (city: any, index: number, self: any[]) =>
          index === self.findIndex((c) => c.name === city.name && c.country === city.country)
      );

      console.log("Unique cities:", uniqueCities);
      return uniqueCities;
    } catch (err: any) {
      console.log("Error fetching city suggestions:", err.message);
      return rejectWithValue(err.message);
    }
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    loadFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    loadHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      if (!state.history.includes(action.payload)) {
        state.history.push(action.payload);
        AsyncStorage.setItem("history", JSON.stringify(state.history));
      }
    },
clearSuggestions: (state) => {
  (state as any).suggestions = [];
},

  },
  extraReducers: (builder) => {
    builder
     // searching the weather states
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.current;
        state.forecast = action.payload.forecast;
        if (!state.history.includes(action.payload.city)) {
          state.history.push(action.payload.city);
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // states loading examples
      .addCase(fetchExampleCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExampleCities.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchExampleCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state) => {
        state.suggestions = [];
      });
      
  },
});

export const { addToFavorites, loadFavorites, loadHistory, addToHistory, clearSuggestions } =
  weatherSlice.actions;

export default weatherSlice.reducer;