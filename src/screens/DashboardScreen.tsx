import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { loadFavorites, loadHistory } from "../stores/weatherSlice";
import { WeatherCard } from "../components/WeatherCard";
import { FavoriteCityItem } from "../components/FavoriteCityItem";
import { theme } from "../styles/theme";
import { formatTemperature } from "../presenters/weatherPresenter";
import { SafeAreaView } from "react-native-safe-area-context";

// 🧩 Importa tu caso de uso
import { getLocalWeather } from "../gateways/getLocalWeather";

export const DashboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, history } = useSelector((state: RootState) => state.weather);

  const [initialized, setInitialized] = useState(false);
  const [localWeather, setLocalWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);

        // 📦 Cargar favoritos e historial desde AsyncStorage
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) dispatch(loadFavorites(JSON.parse(storedFavorites)));

        const storedHistory = await AsyncStorage.getItem("history");
        if (storedHistory) dispatch(loadHistory(JSON.parse(storedHistory)));

        // 📍 Solicitar permisos de ubicación
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

        // 🌦️ Obtener el clima local
        if (hasPermission) {
          Geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude, longitude } = pos.coords;
              const weather = await getLocalWeather(latitude, longitude);
              setLocalWeather(weather);
              setInitialized(true);
              setLoading(false);
            },
            async (err) => {
              console.warn("📍 Location unavailable:", err);
              const weather = await getLocalWeather(undefined, undefined, "New York");
              setLocalWeather(weather);
              setInitialized(true);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
          );
        } else {
          const fallback = await getLocalWeather(undefined, undefined, "New York");
          setLocalWeather(fallback);
        }
      } catch (e) {
        console.error("Error initializing dashboard:", e);
        const fallback = await getLocalWeather(undefined, undefined, "New York");
        setLocalWeather(fallback);
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // 🌀 Estado de carga
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

  // 🌤️ Render principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
        {localWeather ? (
          <>
            {/* 🔆 Tarjeta del clima local */}
            <WeatherCard
              city={localWeather.city}
              description={localWeather.description}
              temperature={formatTemperature(localWeather.temperature)}
              feelsLike={formatTemperature(localWeather.feelsLike)}
              humidity={localWeather.humidity}
              wind={localWeather.wind}
              sunrise={new Date(localWeather.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              sunset={new Date(localWeather.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              date={new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />

            {/* ⭐ Favoritos */}
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

            {/* Historial */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    color: theme.colors.textPrimary,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing(2),
  },
});