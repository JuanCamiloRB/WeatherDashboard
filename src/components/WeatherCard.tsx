import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatTemperature, formatLocalTime } from "../presenters/weatherPresenter";
import { weatherCardstyles as styles } from "../styles/componentsStyles/weatherCard.styles";
import { theme } from "../styles/theme";
interface Props {
  city: string;
  description: string;
  temperature: number;
  feelsLike?: number;
  humidity?: number;
  wind?: number;
  sunrise?: number;          // seconds (sys.sunrise)
  sunset?: number;           // seconds (sys.sunset)
  timezoneOffset?: number;   // seconds (timezone)
  date?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  unit?: "metric" | "imperial";
}

export const WeatherCard: React.FC<Props> = ({
  city,
  description,
  temperature,
  feelsLike,
  humidity,
  wind,
  sunrise,
  sunset,
  timezoneOffset,
  date,
  isFavorite = false,
  onToggleFavorite,
  unit = "metric",
}) => {
  const getWeatherIcon = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes("clear")) return "sunny-outline";
    if (d.includes("cloud")) return "cloud-outline";
    if (d.includes("rain")) return "rainy-outline";
    if (d.includes("thunder")) return "thunderstorm-outline";
    if (d.includes("snow")) return "snow-outline";
    if (d.includes("fog") || d.includes("mist")) return "cloudy-outline";
    return "partly-sunny-outline";
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.city}>{city}</Text>
          {date && <Text style={styles.dateText}>{date}</Text>}
        </View>

        {onToggleFavorite && (
          <TouchableOpacity onPress={onToggleFavorite}>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={isFavorite ? "#FACC15" : "#9CA3AF"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Center */}
      <View style={styles.centerContent}>
        <Ionicons
          name={getWeatherIcon(description)}
          size={48}
          color="#FBBF24"
          style={{ marginBottom: 6 }}
        />
        <Text style={styles.temperature}>{formatTemperature(temperature, unit)}</Text>
        <Text style={styles.description}>{description}</Text>
        {feelsLike !== undefined && (
          <Text style={styles.feelsLike}>
            Feels like {formatTemperature(feelsLike, unit)}
          </Text>
        )}
      </View>

      {/* Details */}
      <View style={styles.detailsRow}>
        {humidity !== undefined && (
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={18} color="#2563EB" />
            <Text style={styles.detailText}>Humidity: {humidity}%</Text>
          </View>
        )}
        {wind !== undefined && (
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={18} color="#2563EB" />
            <Text style={styles.detailText}>Wind: {wind} m/s</Text>
          </View>
        )}
       {sunrise !== undefined && timezoneOffset !== undefined && (
        <View style={styles.detailItem}>
          <Ionicons name="sunny-outline" size={18} color="#F97316" />
          <Text style={styles.detailText}>
            Sunrise: {formatLocalTime(sunrise, timezoneOffset)}
          </Text>
        </View>
      )}

      {sunset !== undefined && timezoneOffset !== undefined && (
        <View style={styles.detailItem}>
          <Ionicons name="moon-outline" size={18} color="#F97316" />
          <Text style={styles.detailText}>
            Sunset: {formatLocalTime(sunset, timezoneOffset)}
          </Text>
        </View>
        )}
      </View>
    </View>
  );
};

