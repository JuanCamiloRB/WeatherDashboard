import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Props {
  city: string;
  temperature: string;
  description: string;
  color: string;
}

export const WeatherCard: React.FC<Props> = ({ city, temperature, description }) => (
  <View style={styles.card}>
    <Text style={styles.city}>{city}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.temperature}>{temperature}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(3),
    marginVertical: theme.spacing(2),
    ...theme.shadow.card,
  },
  city: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 42,
    fontWeight: "bold",
    color: theme.colors.accent,
  },
});