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
import { fetchWeather, addToFavorites, loadFavorites } from "../stores/weatherSlice";
import { WeatherCard } from "../components/WeatherCard";
import { formatTemperature } from "../presenters/weatherPresenter";
import { theme } from "../styles/theme";
import { fetchExampleCities, fetchCitySuggestions } from "../stores/weatherSlice";

export const SearchScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, loading, error, favorites } = useSelector(
    (state: RootState) => state.weather
  );
 const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const { suggestions } = useSelector((state: RootState) => state.weather);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [exampleWeathers, setExampleWeathers] = useState<any[]>([]);
  const API_KEY = "08db7e8c08cf521b308406b429394ef0"; // your key
const handleQueryChange = (text: string) => {
  setQuery(text);
  if (typingTimeout) clearTimeout(typingTimeout);
  if (text.length > 2) {
    const timeout = setTimeout(() => {
      dispatch(fetchCitySuggestions(text));
    }, 400); // waits 0.4s after user stops typing
    setTypingTimeout(timeout);
  }
};
  // Load sample cities (only data used to render sample cards)
  useEffect(() => {
  const loadExamples = async () => {
    try {
      const result = await dispatch(fetchExampleCities()).unwrap();
      setExampleWeathers(result);
    } catch (err) {
      console.warn("Error al cargar ejemplos:", err);
    }
  };
  loadExamples();
}, [dispatch]);

  const handleSearch = () => {
    if (query.trim().length === 0) return;
    setSearched(true);
    dispatch(fetchWeather(query.trim()));
  };

  // Toggle favorite: if present remove, else add.
  const toggleFavorite = async (cityName: string) => {
    try {
      // if already in favorites -> remove
      if (favorites.includes(cityName)) {
        const updated = favorites.filter((f) => f !== cityName);
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        dispatch(loadFavorites(updated));
      } else {
        dispatch(addToFavorites(cityName));
        // addToFavorites in your slice already writes AsyncStorage (you had that)
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // When user taps an example card, run a search for it
  const onExamplePress = (city: string) => {
    setQuery(city);
    setSearched(true);
    dispatch(fetchWeather(city));
  };

  // Determine whether currentWeather is favorite
  const currentIsFavorite = currentWeather ? favorites.includes(currentWeather.name) : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search input (icon inside) */}
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search for a city..."
            placeholderTextColor={theme.colors.textSecondary}
            value={query}
 onChangeText={handleQueryChange}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            onBlur={() => dispatch({ type: "weather/clearSuggestions" })}
          />
          {suggestions.length > 0 && (
    <View style={styles.suggestionsContainer}>
      {suggestions.map((item: any, index) => (
        <TouchableOpacity
  key={`${item.name}-${index}`}
  onPress={() => {
    setQuery(item.name);
    dispatch(fetchWeather(item.name));
    setSearched(true);
    dispatch({ type: "weather/clearSuggestions" }); // 👈 limpiar al seleccionar
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
</View>

        {/* Loading */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={styles.infoText}>Fetching weather data...</Text>
          </View>
        )}

        {/* No search yet -> show examples */}
        {!loading && !searched && (
          <ScrollView contentContainerStyle={styles.centerContainer}>
            <Text style={styles.infoText}>🔎 Search for your city to see the weather</Text>
            <Text style={[styles.subtitle, { marginTop: 12 }]}>Popular examples</Text>

            <View style={styles.examplesContainer}>
              {exampleWeathers.length === 0 ? (
                <ActivityIndicator size="small" color={theme.colors.textSecondary} />
              ) : (
                exampleWeathers.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => onExamplePress(item.name)}
                    activeOpacity={0.8}
                    style={styles.exampleCardWrapper}
                  >
                    <WeatherCard
                      city={item.name}
                      description={item.weather[0].description}
                      temperature={formatTemperature(item.main.temp)}
                      feelsLike={formatTemperature(item.main.feels_like)}
                      humidity={item.main.humidity}
                      wind={item.wind.speed}
                      sunrise={new Date(item.sys.sunrise * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      sunset={new Date(item.sys.sunset * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      date={new Date().toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      // examples cannot be favorited from here (optional)
                      isFavorite={favorites.includes(item.name)}
                      onToggleFavorite={() => toggleFavorite(item.name)}
                    />
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
        )}

        {/* Search made but city not found */}
        {!loading && searched && error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>❌ City not found</Text>
            <Text style={styles.infoText}>Please check the name and try again.</Text>
          </View>
        )}

        {/* Search result -> allow favorite toggle */}
        {!loading && searched && currentWeather && !error && (
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <WeatherCard
              city={currentWeather.name}
              description={currentWeather.weather[0].description}
              temperature={formatTemperature(currentWeather.main.temp)}
              feelsLike={formatTemperature(currentWeather.main.feels_like)}
              humidity={currentWeather.main.humidity}
              wind={currentWeather.wind.speed}
              sunrise={new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              sunset={new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              date={new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
              isFavorite={currentIsFavorite}
              onToggleFavorite={() => toggleFavorite(currentWeather.name)}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  infoText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  examplesContainer: {
    marginTop: 20,
    width: "100%",
    gap: 12,
  },
  exampleCardWrapper: {
    marginBottom: 12,
  },
 suggestionsContainer: {
  position: "absolute",
  top: 50, // below the search bar
  left: 0,
  right: 0,
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  paddingVertical: 6,
  marginHorizontal: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 6,
  zIndex: 10,
},

suggestionItem: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.border,
},

suggestionText: {
  fontSize: 16,
  color: theme.colors.textPrimary,
},

suggestionItemPressed: {
  backgroundColor: theme.colors.accent + "22", // subtle highlight
},
});