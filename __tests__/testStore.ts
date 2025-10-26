import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../src/stores/weatherSlice';
import settingsReducer from '../src/stores/settingSlice';

// Store de testing SIN efectos secundarios
export const mockStore = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }), // 🔥 desactiva thunk
});

export type MockStore = typeof mockStore;