import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { loadFavorites, loadHistory } from "../stores/weatherSlice";
import { WeatherCard } from "../components/WeatherCard";
import { FavoriteCityItem } from "../components/FavoriteCityItem";
import { ForecastCard } from "../components/ForecastCard";
import { theme } from "../styles/theme";
import { HeaderBar } from "../components/HeaderBar";
import { dashboardScreenStyles as styles } from "../styles/dashboardScreen.styles";
import { getLocalWeather } from "../gateways/getLocalWeather";
import { weatherApi } from "../gateways/weatherApi";

export const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, history } = useSelector((state: RootState) => state.weather);
  const unit = useSelector((state: RootState) => state.settings.unit);

  const [initialized, setInitialized] = useState(false);
  const [localWeather, setLocalWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Refresca clima cuando cambia la unidad (°C ↔ °F)
  useEffect(() => {
    const refreshWeather = async () => {
      if (!localWeather?.city) return;
      try {
        setLoading(true);
        const updatedWeather = await getLocalWeather(undefined, undefined, localWeather.city);
        setLocalWeather(updatedWeather);
        await fetchForecast(updatedWeather.city);
      } catch (error) {
        console.error("Error refreshing weather after unit change:", error);
      } finally {
        setLoading(false);
      }
    };
    refreshWeather();
  }, [unit]);

  // 🌍 Inicialización principal
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);

        // 📦 Cargar favoritos e historial
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) dispatch(loadFavorites(JSON.parse(storedFavorites)));

        const storedHistory = await AsyncStorage.getItem("history");
        if (storedHistory) dispatch(loadHistory(JSON.parse(storedHistory)));

        // 📍 Pedir permisos de ubicación
        let hasPermission = false;
        if (Platform.OS === "ios") {
          const permission = await Geolocation.requestAuthorization("whenInUse");
          hasPermission = permission === "granted";
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Weather App Location Permission",
              message: "We need your location to show your current weather.",
              buttonPositive: "OK",
            }
          );
          hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        // 🌦️ Obtener clima local o fallback
       if (hasPermission) {
  Geolocation.getCurrentPosition(
  async (pos) => {
    const { latitude, longitude } = pos.coords;
    const weather = await getLocalWeather(latitude, longitude);
    setLocalWeather(weather);
    await fetchForecast(weather.city, weather.coord?.lat, weather.coord?.lon); // ✅
    setInitialized(true);
    setLoading(false);
  },
  async (err) => {
    console.warn("📡 Location unavailable:", err);
    const fallback = await getLocalWeather(undefined, undefined, "New York");
    setLocalWeather(fallback);
    await fetchForecast("New York");
    setInitialized(true);
    setLoading(false);
  },
  { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
);
        } else {
          const fallback = await getLocalWeather(undefined, undefined, "New York");
          setLocalWeather(fallback);
          await fetchForecast("New York");
        }
      } catch (e) {
        console.error("Error initializing dashboard:", e);
        const fallback = await getLocalWeather(undefined, undefined, "New York");
        setLocalWeather(fallback);
        await fetchForecast("New York");
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  //  Obtener pronóstico (cada 3h → 5 días)
  const fetchForecast = async (city?: string, lat?: number, lon?: number) => {
  try {
    let data;

    if (lat && lon) {
      console.log("📍 Fetching forecast by coords:", { lat, lon });
      data = await weatherApi.fetchForecast(undefined, lat, lon);
    } else if (city && city.trim().length > 0) {
      console.log("🏙️ Fetching forecast by city:", city);
      data = await weatherApi.fetchForecast(city);
    } else {
      console.warn("⚠️ No valid city or coordinates for forecast");
      return;
    }

    const daily = data.list
      .filter((_: any, i: number) => i % 8 === 0)
      .map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        description: item.weather[0].description,
      }));

    console.log("📅 Processed forecast:", daily);
    setForecast(daily);
  } catch (err: any) {
    console.error("❌ Error fetching forecast:", err?.response?.data || err?.message || err);
  }
};

  //  Loader
  if (!initialized || loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          Getting your weather...
        </Text>
      </View>
    );
  }

  //  Render principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar />
      <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
        {localWeather ? (
          <>
            {/* ☀️ Clima actual */}
            <WeatherCard
              city={localWeather.city}
              description={localWeather.description}
              temperature={localWeather.temperature}
              feelsLike={localWeather.feelsLike}
              humidity={localWeather.humidity}
              wind={localWeather.wind}
              unit={unit}
              sunrise={localWeather.sunrise}
              sunset={localWeather.sunset}
              timezoneOffset={localWeather.timezone}
              date={new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />

            {/* Pronóstico */}
           {forecast.length > 0 && (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>5-Day Forecast</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
      {forecast.map((f, i) => {
        const formattedDate = new Date(f.dt * 1000).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        return (
          <ForecastCard
            key={i}
            date={formattedDate} // 👈 pasa la fecha formateada
            temperature={f.temp}
            description={f.description}
            unit={unit}
          />
        );
      })}
    </ScrollView>
  </View>
)}

            {/*  Favoritos */}
            <Text style={styles.sectionTitle}>Favorite Cities</Text>
            {favorites.length === 0 ? (
              <Text style={styles.emptyText}>No favorite cities yet.</Text>
            ) : (
              favorites.map((fav) => (
                <FavoriteCityItem
                  key={fav}
                  city={fav}
                  onSelect={() => {}}
                  onRemove={async (c) => {
                    const updated = favorites.filter((x) => x !== c);
                    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
                    dispatch(loadFavorites(updated));
                  }}
                />
              ))
            )}

            {/* 🕓 Historial */}
            <Text style={styles.sectionTitle}>Search History</Text>
            {history.length === 0 ? (
              <Text style={styles.emptyText}>No recent searches yet.</Text>
            ) : (
              history.map((h) => (
                <FavoriteCityItem
                  key={h}
                  city={h}
                  onSelect={() => {}}
                  onRemove={async (c) => {
                    const updated = history.filter((x) => x !== c);
                    await AsyncStorage.setItem("history", JSON.stringify(updated));
                    dispatch(loadHistory(updated));
                  }}
                />
              ))
            )}
          </>
        ) : (
          <Text style={styles.emptyText}>No weather data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};