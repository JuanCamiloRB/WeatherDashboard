import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { searchBarStyles as styles } from "../styles/componentsStyles/searchBar.styles";
import { theme } from "../styles/theme";
interface Props {
  city: string;
  setCity: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<Props> = ({ city, setCity, onSearch }) => (
  <View style={styles.container}>
    {/* Input with Icon*/}
    <View style={styles.inputWrapper}>
      <Ionicons name="search-outline" size={18} color="#6B7280" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#6B7280"
        value={city}
        onChangeText={setCity}
      />
    </View>

    {/* Botón Search */}
    <TouchableOpacity style={styles.button} onPress={onSearch} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  </View>
);

