import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

interface Props {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<Props> = ({ city, setCity, onSearch }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search city..."
      placeholderTextColor={theme.colors.textSecondary}
      value={city}
      onChangeText={setCity}
    />
    <TouchableOpacity style={styles.button} onPress={onSearch}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});