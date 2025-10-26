import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react-native";

// Reducers falsos para mockear el estado
const mockWeatherReducer = (state = {
  favorites: [],
  history: [],
  currentWeather: null,
  loading: false,
  error: null,
  suggestions: [],
}, action: any) => state;

const mockSettingsReducer = (state = {
  unit: "metric",
  theme: "light",
}, action: any) => state;

// Store estático que no cambia (evita loops infinitos)
export const createMockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      weather: mockWeatherReducer,
      settings: mockSettingsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  });

export const renderWithStore = (ui: ReactNode, preloadedState = {}) => {
  const store = createMockStore(preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
};