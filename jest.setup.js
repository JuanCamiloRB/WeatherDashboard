jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// ✅ Mock de NativeAnimatedHelper (evita error si no existe)
try {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
} catch {
  console.warn("⚠️ Skipping NativeAnimatedHelper mock (not found)");
}

// ✅ Mock de AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// ✅ Mock de redux-persist (sin efectos reales)
jest.mock("redux-persist", () => ({
  persistReducer: jest.fn((config, reducer) => reducer),
  persistStore: jest.fn(() => ({ purge: jest.fn(), flush: jest.fn() })),
}));

// ✅ Mock de React Navigation (useNavigation y contenedor)
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
    NavigationContainer: ({ children }) => <>{children}</>,
  };
});

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
  }),
}));

// ✅ Mock del store Redux
jest.mock("./src/stores/weatherStore", () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      weather: {
        favorites: [],
        history: [],
        currentWeather: null,
        loading: false,
        error: null,
        suggestions: [],
      },
      settings: { unit: "metric" },
    })),
    subscribe: jest.fn(),
  },
}));

// ✅ Silencia logs para evitar "Cannot log after tests are done"
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});