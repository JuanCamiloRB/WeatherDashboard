import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { formatTemperature } from "../presenters/weatherPresenter";

interface ForecastCardProps {
  date: string;
  temperature: number; // 👈 debe ser número, no string
  description: string;
  unit: "metric" | "imperial"; // 👈 agregamos la unidad
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  temperature,
  description,
  unit,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.temp}>{formatTemperature(temperature, unit)}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing(2),
    borderRadius: theme.radius.md,
    marginRight: theme.spacing(2),
    alignItems: "center",
    ...theme.shadow.card,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  desc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textTransform: "capitalize",
  },
});