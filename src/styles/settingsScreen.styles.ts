import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const settingsScreenStyles = StyleSheet.create({
   safeArea: {
   flex: 1,
   backgroundColor: theme.colors.background,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitText: {
    marginHorizontal: 6,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  closeButton: {
    alignSelf: "center",
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeText: {
    color: "white",
    fontWeight: "500",
  },
});
