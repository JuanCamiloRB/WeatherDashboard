import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { loadHistory } from "../stores/weatherSlice";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export const HistoryScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { history, favorites } = useSelector((s: RootState) => s.weather);

  const clearHistory = async () => {
    await AsyncStorage.removeItem("history");
    dispatch(loadHistory([]));
  };

  const isFavorite = (city: string) => favorites.includes(city);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Search History</Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>

        {history.length === 0 ? (
          <Text style={styles.text}>No searches yet.</Text>
        ) : (
          history.map((city) => (
            <View key={city} style={styles.historyItem}>
              <Text style={styles.cityText}>📍 {city}</Text>
              {isFavorite(city) ? (
                <Ionicons name="star" size={20} color={theme.colors.accent} />
              ) : (
                <Ionicons name="star-outline" size={20} color={theme.colors.textSecondary} />
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  text: {
    color: theme.colors.textSecondary,
    marginVertical: 4,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cityText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
});