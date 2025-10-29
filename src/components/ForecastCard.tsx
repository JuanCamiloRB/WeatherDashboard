import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { formatTemperature } from "../presenters/weatherPresenter";
import { forecastCardstyles as styles } from "../styles/componentsStyles/forecastCard.styles";

interface ForecastCardProps {
  date: string;
  temperature: number; 
  description: string;
  unit: "metric" | "imperial"; 
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
