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

const getEmoji = (desc: string) => {
  const d = desc.toLowerCase();
  if (d.includes("rain")) return "🌧️";
  if (d.includes("cloud")) return "⛅";
  if (d.includes("clear")) return "☀️";
  return "🌤️";
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    marginRight: theme.spacing(2),
    ...theme.shadow.card,
  },
  date: { fontWeight: "600", marginBottom: 4 },
  icon: { fontSize: 24, marginVertical: 4 },
  desc: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 6 },
  temp: { fontSize: 18, fontWeight: "bold" },
});