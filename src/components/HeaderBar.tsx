import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../stores/weatherStore";
import { toggleUnit } from "../stores/settingSlice";
import { theme } from "../styles/theme";
import { headerBarstyles as styles } from "../styles/componentsStyles/headerBar.styles";

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
