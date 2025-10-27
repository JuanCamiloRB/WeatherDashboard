import { weatherRepositoryImpl } from "./repositories/weaherRepositoryImpl";

export const getLocalWeather = async (
  lat?: number,
  lon?: number,
  fallbackCity = "New York"
) => {
  try {
    let data;

    if (lat && lon) {
      //  searching with coor
      data = await weatherRepositoryImpl.getWeatherByCoords(lat, lon);
    } else {
      // searching by city
      data = await weatherRepositoryImpl.getWeatherByCity(fallbackCity);
    }
    //  trying to return the data 
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
    console.error(" Error getting local weather:", error);

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