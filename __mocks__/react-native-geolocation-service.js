export default {
  requestAuthorization: jest.fn(() => Promise.resolve("granted")),
  getCurrentPosition: jest.fn((success) =>
    success({ coords: { latitude: 10, longitude: 10 } })
  ),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
};