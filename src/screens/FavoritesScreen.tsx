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
import { ForecastCard } from "../components/ForecastCard";
import { favoritesScreenStyles as styles } from "../styles/favoritesScreen.styles";

export const FavoritesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.weather);

  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unit = useSelector((state: RootState) => state.settings.unit);

 useEffect(() => {
    if (favorites.length > 0) fetchFavoritesWeather();
    else setWeatherData({});
}, [favorites, unit]);

  /**  Fetch weather data for favorite cities using weatherApi */
  const fetchFavoritesWeather = async () => {
  try {
    setLoading(true);
    setError(null);

    const results: Record<string, any> = {};

    const responses = await Promise.allSettled(
      favorites.map(async (city) => {
        const current = await weatherApi.fetchCurrentWeather(city);
        const forecast = await weatherApi.fetchForecast(city); // 👈 use your API

        // Extract 1 forecast every 24h (same hour)
        const dailyForecasts = forecast.list.filter((_: any, index: number) => index % 8 === 0);

        return { city, current, forecast: dailyForecasts };
      })
    );

    responses.forEach((res) => {
      if (res.status === "fulfilled") {
        const { city, current, forecast } = res.value;
        results[city] = { current, forecast };
      }
    });

    setWeatherData(results);
  } catch (err: any) {
    console.error(" Error fetching favorite weather:", err.message);
    setError("Unable to fetch weather data. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  /** Remove a city from favorites */
  const handleRemove = async (city: string) => {
    try {
      const updated = favorites.filter((f) => f !== city);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      dispatch(loadFavorites(updated));
    } catch (err) {
      console.error(" Error removing favorite:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text style={styles.title}>My Favorite Cities</Text>

        {/* error*/}
        {error && (
          <Text style={[styles.text, { color: "red" }]}>{error}</Text>
        )}

        {/* loading */}
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
      city={weather.current.name}
      description={weather.current.weather[0].description}
     temperature={weather.current.main.temp}
    feelsLike={weather.current.main.feels_like}
      humidity={weather.current.main.humidity}
      wind={weather.current.wind.speed}
      unit={unit}
        sunrise={weather.current.sys.sunrise}           
  sunset={weather.current.sys.sunset}             
  timezoneOffset={weather.current.timezone}   
      date={new Date().toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}
      isFavorite={true}
      onToggleFavorite={() => handleRemove(city)}
    />

     {/*  5-day forecast */}
        <View style={{ marginTop: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {weather.forecast.map((f: any, i: number) => {
                const formattedDate = new Date(f.dt * 1000).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                });

                return (
                    <ForecastCard
                    key={i}
                    date={formattedDate} 
                    temperature={f.main.temp}
                    description={f.weather[0].description}
                    unit={unit}
                    />
                );
             })}
                </ScrollView>
                </View>

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

/* Styles */
