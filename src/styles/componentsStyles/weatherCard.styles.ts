import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const weatherCardstyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: theme.spacing(2),
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  city: { fontSize: 22, fontWeight: "700", color: theme.colors.textPrimary },
  dateText: { color: theme.colors.textSecondary, fontSize: 14, marginTop: 2 },
  centerContent: { alignItems: "center", marginVertical: 12 },
  temperature: { fontSize: 48, fontWeight: "bold", color: theme.colors.accent },
  description: { fontSize: 18, color: theme.colors.textSecondary, textTransform: "capitalize" },
  feelsLike: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 12,
  },
  detailItem: { flexDirection: "row", alignItems: "center", marginHorizontal: 8, marginVertical: 4 },
  detailText: { marginLeft: 6, color: theme.colors.textPrimary, fontSize: 14, fontWeight: "500" },
});