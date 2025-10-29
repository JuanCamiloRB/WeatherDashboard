import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { favoritesCityItemStyles as styles } from "../styles/componentsStyles/favoritesCityItem.styles";

interface Props {
  city: string;
  onSelect: (city: string) => void;
  onRemove?: (city: string) => void;
}

export const FavoriteCityItem: React.FC<Props> = ({ city, onSelect, onRemove }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onSelect(city)} style={styles.cityBox}>
      <Text style={styles.text}>{city}</Text>
    </TouchableOpacity>

    {onRemove && (
      <TouchableOpacity onPress={() => onRemove(city)} style={styles.removeButton}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

