import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootState, AppDispatch } from "../stores/weatherStore";
import { loadFavorites } from "../stores/weatherSlice";
import { weatherApi } from "../gateways/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { formatTemperature } from "../presenters/weatherPresenter";
import { theme } from "../styles/theme";

export const FavoritesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.weather);

  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length > 0) fetchFavoritesWeather();
    else setWeatherData({});
  }, [favorites]);

  /** 🔄 Fetch weather data for favorite cities using weatherApi */
  const fetchFavoritesWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const results: Record<string, any> = {};

      // ✅ Fetch todas las ciudades en paralelo usando tu capa API
      const responses = await Promise.allSettled(
        favorites.map((city) => weatherApi.fetchCurrentWeather(city))
      );

      responses.forEach((res) => {
        if (res.status === "fulfilled") {
          const data = res.value;
          results[data.name] = data;
        }
      });

      setWeatherData(results);
    } catch (err: any) {
      console.error("❌ Error fetching favorite weather:", err.message);
      setError("Unable to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /** 🗑️ Remove a city from favorites */
  const handleRemove = async (city: string) => {
    try {
      const updated = favorites.filter((f) => f !== city);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      dispatch(loadFavorites(updated));
    } catch (err) {
      console.error("❌ Error removing favorite:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text style={styles.title}>My Favorite Cities</Text>

        {/* ⚠️ Estado de error */}
        {error && (
          <Text style={[styles.text, { color: "red" }]}>{error}</Text>
        )}

        {/* ⏳ Estado de carga */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={styles.text}>Loading weather data...</Text>
          </View>
        ) : favorites.length === 0 ? (
          <Text style={styles.text}>No favorites yet.</Text>
        ) : (
          favorites.map((city) => {
            const weather = weatherData[city];
            if (!weather)
              return (
                <Text key={city} style={styles.text}>
                  Loading weather for {city}...
                </Text>
              );

            return (
              <View key={city} style={styles.favoriteItemContainer}>
                <WeatherCard
                  city={weather.name}
                  description={weather.weather[0].description}
                  temperature={formatTemperature(weather.main.temp)}
                  feelsLike={formatTemperature(weather.main.feels_like)}
                  humidity={weather.main.humidity}
                  wind={weather.wind.speed}
                  sunrise={new Date(
                    weather.sys.sunrise * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  sunset={new Date(
                    weather.sys.sunset * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  date={new Date().toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  isFavorite={true}
                  onToggleFavorite={() => handleRemove(city)}
                />

                <TouchableOpacity
                  style={styles.trashButton}
                  onPress={() => handleRemove(city)}
                >
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

/* 🎨 Styles */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  text: {
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  favoriteItemContainer: {
    position: "relative",
    marginBottom: 16,
  },
  trashButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 6,
  },
});