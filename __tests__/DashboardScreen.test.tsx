import React from "react";
import { renderWithStore } from "./testUtils";
import { waitFor, screen } from "@testing-library/react-native";
import { DashboardScreen } from "../src/screens/DashboardScreen";

jest.mock("react-native-geolocation-service", () => ({
  requestAuthorization: jest.fn(() => Promise.resolve("granted")),
  getCurrentPosition: jest.fn((success) =>
    success({ coords: { latitude: 10, longitude: 10 } })
  ),
}));

jest.mock("../src/gateways/getLocalWeather", () => ({
  getLocalWeather: jest.fn(() =>
    Promise.resolve({
      city: "Test City",
      coord: { lat: 10, lon: 10 },
      description: "clear sky",
      temperature: 25,
    })
  ),
}));

// ✅ Mockeamos la API para que la promesa se resuelva sin logs tardíos
jest.mock("../src/gateways/weatherApi", () => ({
  weatherApi: {
    fetchForecast: jest.fn(() =>
      Promise.resolve({
        list: [
          {
            dt: 1761469200,
            main: { temp: 26.1 },
            weather: [{ description: "few clouds" }],
          },
        ],
      })
    ),
  },
}));

describe("DashboardScreen", () => {
  it("renders loading, then shows weather", async () => {
    renderWithStore(<DashboardScreen />);

    // Paso 1: muestra el loader inicialmente
    expect(screen.getByText(/getting your weather/i)).toBeTruthy();

    // Paso 2: espera a que desaparezca el loader (indicando que terminó el async)
    await waitFor(() =>
      expect(screen.queryByText(/getting your weather/i)).toBeNull()
    );

    // Paso 3: espera que aparezca el contenido del clima
    await waitFor(() => expect(screen.getByText(/test city/i)).toBeTruthy());
  });
});