import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { fetchWeather, addToFavorites, loadFavorites } from "../stores/weatherSlice";
import { WeatherCard } from "../components/WeatherCard";
import { ForecastCard } from "../components/ForecastCard";
import { SearchBar } from "../components/SearchBar";
import { formatTemperature, getWeatherColor, formatDate } from "../presenters/weatherPresenter";
import { theme } from "../styles/theme";
import { FavoriteCityItem } from "../components/FavoriteCityItem";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const DashboardScreen: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const favorites = useSelector((state: RootState) => state.weather.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, forecast, loading, error } = useSelector((state: RootState) => state.weather);

  const handleSearch = () => city.trim() && dispatch(fetchWeather(city));
  const handleAddFavorite = () => currentWeather && dispatch(addToFavorites(currentWeather.name));

  return (
  <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
    <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

    {loading && <Text style={styles.loading}>Loading...</Text>}
    {error && <Text style={styles.error}>{error}</Text>}

    {currentWeather && (
      <>
        <WeatherCard
          city={currentWeather.name}
          description={currentWeather.weather[0].description}
          temperature={formatTemperature(currentWeather.main.temp)}
          color={getWeatherColor(currentWeather.weather[0].description)}
        />

        <Button title="Add to Favorites" onPress={handleAddFavorite} />

        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={forecast.slice(0, 5)}
          renderItem={({ item }) => (
            <ForecastCard
              date={formatDate(item.dt_txt)}
              description={item.weather[0].description}
              temperature={formatTemperature(item.main.temp)}
            />
          )}
          keyExtractor={(item) => item.dt.toString()}
        />
      </>
    )}

    {/* ⭐ Favorite Cities Section */}
    <Text style={styles.sectionTitle}>Favorite Cities</Text>
    {favorites.length === 0 ? (
      <Text style={styles.emptyText}>No favorite cities yet. Add one to get started!</Text>
    ) : (
      favorites.map((fav) => (
        <FavoriteCityItem
          key={fav}
          city={fav}
          onSelect={(c) => dispatch(fetchWeather(c))}
          onRemove={async (c) => {
            const updated = favorites.filter((x) => x !== c);
            await AsyncStorage.setItem("favorites", JSON.stringify(updated));
            dispatch(loadFavorites(updated));
          }}
        />
      ))
    )}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 },
  loading: { textAlign: "center", color: theme.colors.textSecondary },
  error: { textAlign: "center", color: "red" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: theme.spacing(2),
    color: theme.colors.textPrimary,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing(2),
  },
});