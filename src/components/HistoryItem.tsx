import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { historyItemStyles as styles } from "../styles/componentsStyles/historyItem.styles";

interface Props {
  city: string;
  onSelect: (city: string) => void;
}

export const HistoryItem: React.FC<Props> = ({ city, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{city}</Text>
    <Button title="View" onPress={() => onSelect(city)} />
  </View>
);

