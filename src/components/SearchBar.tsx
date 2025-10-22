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
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 8,
    marginBottom: theme.spacing(2),
    ...theme.shadow.card,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});