import { weatherRepositoryImpl } from "./repositories/weaherRepositoryImpl";

export const getLocalWeather = async (
  lat?: number,
  lon?: number,
  fallbackCity = "New York"
) => {
  try {
    let data;

    if (lat && lon) {
      // 📍 Buscar por coordenadas
      data = await weatherRepositoryImpl.getWeatherByCoords(lat, lon);
    } else {
      // 🏙️ Buscar por ciudad
      data = await weatherRepositoryImpl.getWeatherByCity(fallbackCity);
    }

    // ✅ Normaliza siempre el formato de salida
    const coord = data.coord || {};

    return {
      ...data,
      city: data.city ?? fallbackCity,
      coord: {
        lat: coord.lat ?? lat ?? 0,
        lon: coord.lon ?? lon ?? 0,
      },
    };
  } catch (error) {
    console.error("⚠️ Error getting local weather:", error);

    const fallback = await weatherRepositoryImpl.getWeatherByCity(fallbackCity);

    return {
      ...fallback,
      city: fallback.city ?? fallbackCity,
      coord: {
        lat: fallback.coord?.lat ?? 0,
        lon: fallback.coord?.lon ?? 0,
      },
    };
  }
};