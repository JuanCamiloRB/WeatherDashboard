import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const forecastCardstyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing(2),
    borderRadius: theme.radius.md,
    marginRight: theme.spacing(2),
    alignItems: "center",
    ...theme.shadow.card,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  desc: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textTransform: "capitalize",
  },
});