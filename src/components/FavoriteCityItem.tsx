import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

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

const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cityBox: { flex: 1 },
  text: { fontSize: 16, fontWeight: "600", color: "#1E1E1E" },
  removeButton: {
    backgroundColor: "#F87171",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
  },
});