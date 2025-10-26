import React from "react";
import { renderWithStore } from "./testUtils";
import { waitFor } from "@testing-library/react-native";
import { FavoritesScreen } from "../src/screens/FavoritesScreen";

jest.mock("../src/gateways/weatherApi", () => ({
  weatherApi: {
    fetchCurrentWeather: jest.fn(() =>
      Promise.resolve({
        name: "Paris",
        weather: [{ description: "sunny" }],
        main: { temp: 20 },
      })
    ),
  },
}));

describe("FavoritesScreen", () => {
  it("renders correctly with no favorites", async () => {
    const { getByText } = renderWithStore(<FavoritesScreen />);
    await waitFor(() => expect(getByText(/no favorites yet/i)).toBeTruthy());
  });
});