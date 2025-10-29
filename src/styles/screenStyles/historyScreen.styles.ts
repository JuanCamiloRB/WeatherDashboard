import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const historyScreenStyles = StyleSheet.create({
  container: { backgroundColor: theme.colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600", color: theme.colors.textPrimary },
  text: { color: theme.colors.textSecondary, marginVertical: 4 },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});