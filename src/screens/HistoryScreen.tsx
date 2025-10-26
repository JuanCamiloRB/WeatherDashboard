import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { loadHistory } from "../stores/weatherSlice";
import { theme } from "../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { historyScreenStyles as styles } from "../styles/historyScreen.styles";
export const HistoryScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { history } = useSelector((s: RootState) => s.weather);

  const clearHistory = async () => {
    await AsyncStorage.removeItem("history");
    dispatch(loadHistory([]));
  };

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
            <Text key={city} style={styles.text}>📍 {city}</Text>
            ))
        )}
        </ScrollView>
    </SafeAreaView>
  );
};

