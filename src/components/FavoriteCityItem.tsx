import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../styles/theme"; // 👈 Create if you don’t have it yet (see below)

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
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cityBox: { flex: 1 },
  text: { fontSize: 16, fontWeight: "600", color: "#1E1E1E" },
  removeButton: {
    backgroundColor: "#EF4444",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
});