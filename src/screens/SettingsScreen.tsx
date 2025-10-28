import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/weatherStore";
import { setUnit } from "../stores/settingSlice";
import { settingsScreenStyles as styles } from "../styles/settingsScreen.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../styles/theme";

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.unit);

  const toggleUnit = () => {
    dispatch(setUnit(unit === "metric" ? "imperial" : "metric"));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>⚙️ Settings</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Temperature Unit</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.unitText}>°C</Text>
            <Switch
              value={unit === "imperial"}
              onValueChange={toggleUnit}
              thumbColor={unit === "imperial" ? theme.colors.accent : "#f4f3f4"}
              trackColor={{ false: "#767577", true: theme.colors.accentLight }}
            />
            <Text style={styles.unitText}>°F</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

