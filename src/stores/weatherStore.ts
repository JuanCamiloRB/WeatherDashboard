import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import settingsReducer from "./settingSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// weather persintency
const weatherPersistConfig = {
  key: "weather",
  storage: AsyncStorage,
  whitelist: ["favorites"], // only favorites
};

// we create a persintency for the emperature conversion
const settingsPersistConfig = {
  key: "settings",
  storage: AsyncStorage,
  whitelist: ["unit"],
};

// Reducers persits
const persistedWeatherReducer = persistReducer(weatherPersistConfig, weatherReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    weather: persistedWeatherReducer,
    settings: persistedSettingsReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// global types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;