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

// 🎯 Persistencia para el clima (solo favoritos)
const weatherPersistConfig = {
  key: "weather",
  storage: AsyncStorage,
  whitelist: ["favorites"], // Solo favoritos
};

// 🎯 Persistencia para la configuración (unidad °C/°F)
const settingsPersistConfig = {
  key: "settings",
  storage: AsyncStorage,
  whitelist: ["unit"],
};

// Reducers persistidos
const persistedWeatherReducer = persistReducer(weatherPersistConfig, weatherReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    weather: persistedWeatherReducer,
    settings: persistedSettingsReducer, // 🆕 Añadido
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// 🧩 Tipos globales
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;