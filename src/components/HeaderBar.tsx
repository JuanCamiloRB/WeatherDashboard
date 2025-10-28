import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { toggleUnit } from "../stores/settingSlice";
import { theme } from "../styles/theme";

export const HeaderBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const unit = useSelector((state: RootState) => state.settings.unit);

  
  const handleToggle = (value: boolean) => {
    dispatch(toggleUnit()); 
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="cloud-outline" size={24} color={theme.colors.accent} />
        <Text style={styles.title}>Weather Dashboard</Text>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginHorizontal: 4,
  },
});