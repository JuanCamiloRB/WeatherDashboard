import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const headerBarstyles = StyleSheet.create({
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