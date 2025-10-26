import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TemperatureUnit = "metric" | "imperial"; // °C | °F

interface SettingsState {
  unit: TemperatureUnit;
}

const initialState: SettingsState = {
  unit: "metric",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "metric" ? "imperial" : "metric";
    },
    setUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.unit = action.payload;
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;