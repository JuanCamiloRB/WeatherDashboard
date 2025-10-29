import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const dashboardScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screen: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    color: theme.colors.textPrimary,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing(2),
  },
});