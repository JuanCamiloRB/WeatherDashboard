import React from "react";
import { renderWithStore } from "./testUtils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { SearchScreen } from "../src/screens/SearchScreen";

// Mock API
jest.mock("../src/gateways/weatherApi", () => ({
  weatherApi: {
    fetchForecast: jest.fn(() =>
      Promise.resolve({
        list: [
          { dt: 1700000000, main: { temp: 23 }, weather: [{ description: "clear" }] },
        ],
      })
    ),
  },
}));

describe("SearchScreen", () => {
  it("renders input and can type a query", async () => {
    const { getByPlaceholderText } = renderWithStore(<SearchScreen />);
    const input = getByPlaceholderText("Search city...");
    fireEvent.changeText(input, "London");
    await waitFor(() => expect(input.props.value).toBe("London"));
  });
});