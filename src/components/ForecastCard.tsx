import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Props {
  date: string;
  temperature: string;
  description: string;
}

export const ForecastCard: React.FC<Props> = ({ date, temperature, description }) => (
  <View style={styles.card}>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.icon}>{getEmoji(description)}</Text>
    <Text style={styles.desc}>{description}</Text>
    <Text style={styles.temp}>{temperature}</Text>
  </View>
);

// 🔹 Mapeo más completo de condiciones del clima a emojis
const getEmoji = (desc: string) => {
  const d = desc.toLowerCase();

  // ☀️ Soleado o despejado
  if (d.includes("clear sky")) return "☀️";

  // 🌤️ Parcialmente nublado
  if (d.includes("few clouds")) return "🌤️";
  if (d.includes("scattered clouds")) return "⛅";
  if (d.includes("broken clouds") || d.includes("overcast clouds")) return "☁️";

  // 🌧️ Lluvia en diferentes intensidades
  if (d.includes("light rain")) return "🌦️";
  if (d.includes("moderate rain")) return "🌧️";
  if (d.includes("heavy rain") || d.includes("rain showers")) return "⛈️";
  if (d.includes("drizzle")) return "🌦️";
  if (d.includes("shower rain")) return "🌧️";

  // ❄️ Nieve
  if (d.includes("snow")) return "❄️";

  // 🌫️ Niebla o bruma
  if (d.includes("mist") || d.includes("fog") || d.includes("haze")) return "🌫️";

  // ⚡ Tormentas
  if (d.includes("thunderstorm")) return "⛈️";

  // 🌪️ Otros fenómenos
  if (d.includes("tornado")) return "🌪️";
  if (d.includes("dust") || d.includes("sand")) return "🌬️";

  // Valor por defecto si no hay coincidencia
  return "🌤️";
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    width: 110,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  date: { 
    fontWeight: "600", 
    fontSize: 13, 
    color: "#374151", 
    marginBottom: 6 
  },
  icon: { 
    fontSize: 30, 
    marginVertical: 6 
  },
  desc: { 
    fontSize: 12, 
    color: "#6B7280", 
    marginBottom: 4, 
    textTransform: "capitalize" 
  },
  temp: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#2563EB" 
  },
});