import { weatherRepositoryImpl } from "./repositories/weaherRepositoryImpl";

export const getLocalWeather = async (
  lat?: number,
  lon?: number,
  fallbackCity = "New York"
) => {
  try {
    if (lat && lon) {
      return await weatherRepositoryImpl.getWeatherByCoords(lat, lon);
    }
    return await weatherRepositoryImpl.getWeatherByCity(fallbackCity);
  } catch (error) {
    console.error("⚠️ Error getting local weather:", error);
    return await weatherRepositoryImpl.getWeatherByCity(fallbackCity);
  }
};