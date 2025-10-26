import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { HistoryScreen } from "../src/screens/HistoryScreen";


// ✅ Reducer mínimo para simular el slice de weather
const mockWeatherReducer = (state = { history: [] }, action: any) => state;

// ✅ Reducer mínimo para settings (por si lo usa)
const mockSettingsReducer = (state = {}, action: any) => state;

// ✅ Mock store específico para este test
const mockStore = configureStore({
  reducer: {
    weather: mockWeatherReducer,
    settings: mockSettingsReducer,
  },
});

describe("HistoryScreen", () => {
  it("renders empty state", () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <HistoryScreen />
      </Provider>
    );

    // Texto real mostrado por el componente
    expect(getByText(/no searches yet/i)).toBeTruthy();
  });
});