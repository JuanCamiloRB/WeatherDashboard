import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppDispatch, RootState } from "../stores/weatherStore";
import {
  fetchWeather,
  addToFavorites,
  loadFavorites,
  fetchExampleCities,
  fetchCitySuggestions,
} from "../stores/weatherSlice";
import { WeatherCard } from "../components/WeatherCard";
import { ForecastCard } from "../components/ForecastCard";
import { formatLocalTime, formatTemperature } from "../presenters/weatherPresenter";
import { theme } from "../styles/theme";
import { weatherApi } from "../gateways/weatherApi";
import { searchScreenStyles as styles } from "../styles/searchScreen.styles";

export const SearchScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, loading, error, favorites, suggestions } = useSelector(
    (state: RootState) => state.weather
  );

  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [exampleWeathers, setExampleWeathers] = useState<any[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);
const unit = useSelector((state: RootState) => state.settings.unit);
  /**  Handle query typing + suggestions */
  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (typingTimeout) clearTimeout(typingTimeout);

    if (text.length > 2) {
      const timeout = setTimeout(() => {
        dispatch(fetchCitySuggestions(text));
      }, 400);
      setTypingTimeout(timeout);
    } else {
      dispatch({ type: "weather/clearSuggestions" });
    }
  };

  /**  Load example cities on mount */
  useEffect(() => {
  const loadExamples = async () => {
    try {
      const result = await dispatch(fetchExampleCities()).unwrap();
      setExampleWeathers(result);
    } catch (err) {
      console.warn("Error loading example cities:", err);
    }
  };
  loadExamples();
}, [dispatch, unit]);

  /**  Perform search + forecast */
  const handleSearch = async () => {
    if (query.trim().length === 0) return;
    setSearched(true);
    await dispatch(fetchWeather(query.trim()));
    fetchForecast(query.trim());
    dispatch({ type: "weather/clearSuggestions" });
  };

  /**  Fetch 5-day forecast */
  const fetchForecast = async (city: string) => {
    try {
      const data = await weatherApi.fetchForecast(city);
      const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  /**  Toggle favorites */
  const toggleFavorite = async (cityName: string) => {
    try {
      if (favorites.includes(cityName)) {
        const updated = favorites.filter((f) => f !== cityName);
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        dispatch(loadFavorites(updated));
      } else {
        dispatch(addToFavorites(cityName));
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  /**  Example card click */
  const onExamplePress = async (city: string) => {
    setQuery(city);
    setSearched(true);
    await dispatch(fetchWeather(city));
    fetchForecast(city);
  };

  const currentIsFavorite = currentWeather ? favorites.includes(currentWeather.name) : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/*  Search Input */}
     <View style={styles.searchBarContainer}>
  <View style={styles.inputWrapper}>
    <Ionicons name="search-outline" size={18} color="#6B7280" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder="Search city..."
      placeholderTextColor="#6B7280"
      value={query}
      onChangeText={handleQueryChange}
      onSubmitEditing={handleSearch}
      returnKeyType="search"
    />
  </View>

  <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.8}>
    <Text style={styles.searchButtonText}>Search</Text>
  </TouchableOpacity>
</View>

        {/*  Suggestions */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((item: any, index) => (
              <TouchableOpacity
                key={`${item.name}-${index}`}
                onPress={() => {
                  setQuery(item.name);
                  dispatch(fetchWeather(item.name));
                  fetchForecast(item.name);
                  setSearched(true);
                  dispatch({ type: "weather/clearSuggestions" });
                }}
                activeOpacity={0.7}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>
                  {item.name}, {item.country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/*  Loading */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={styles.infoText}>Fetching weather data...</Text>
          </View>
        )}

        {/*  No search yet → show examples */}
        {!loading && !searched && (
          <ScrollView contentContainerStyle={styles.centerContainer}>
            <Text style={styles.infoText}>🔎 Search for your city to see the weather</Text>
            <Text style={[styles.subtitle, { marginTop: 12 }]}>Popular examples</Text>

            <View style={styles.examplesContainer}>
              {exampleWeathers.length === 0 ? (
                <ActivityIndicator size="small" color={theme.colors.textSecondary} />
              ) : (
                exampleWeathers.map((item, index) => (
                    <TouchableOpacity
                        key={`${item.name}-${index}`} 
                        onPress={() => onExamplePress(item.name)}
                        activeOpacity={0.8}
                        style={styles.exampleCardWrapper}
                    >
                        <WeatherCard
                        city={item.name}
                        description={item.weather[0].description}
                        temperature={item.main.temp}
                        feelsLike={item.main.feels_like}
                        unit={unit}
                        humidity={item.main.humidity}
                        wind={item.wind.speed}
                        sunrise={item.sys.sunrise}
                        sunset={item.sys.sunset}
                        timezoneOffset={item.timezone}
                        date={new Date().toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}
                        isFavorite={favorites.includes(item.name)}
                        onToggleFavorite={() => toggleFavorite(item.name)}
                        />
                    </TouchableOpacity>
                    ))
              )}
            </View>
          </ScrollView>
        )}

        {/* City not found */}
        {!loading && searched && error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}> City not found</Text>
            <Text style={styles.infoText}>Please check the name and try again.</Text>
          </View>
        )}

        {/*  City found → show weather + forecast */}
        {!loading && searched && currentWeather && !error && (
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <WeatherCard
            city={currentWeather.name}
            description={currentWeather.weather[0].description}
            temperature={currentWeather.main.temp}
            feelsLike={currentWeather.main.feels_like}
            unit={unit}
            humidity={currentWeather.main.humidity}
            wind={currentWeather.wind.speed}
            sunrise={currentWeather.sys.sunrise}        
            sunset={currentWeather.sys.sunset}         
            timezoneOffset={currentWeather.timezone}  
            date={new Date().toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            })}
              isFavorite={currentIsFavorite}
              onToggleFavorite={() => toggleFavorite(currentWeather.name)}
            />

            {forecast.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.subtitle}>5-Day Forecast</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 10 }}
                >
                  {forecast.map((f, i) => {
                    const formattedDate = new Date(f.dt * 1000).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                    });

                    return (
                        <ForecastCard
                        key={i}
                        date={formattedDate} // 
                        temperature={f.main.temp}
                        description={f.weather[0].description}
                        unit={unit}
                        />
                    );
                    })}
                </ScrollView>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};


