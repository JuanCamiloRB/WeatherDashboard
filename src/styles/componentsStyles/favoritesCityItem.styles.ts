import { StyleSheet } from "react-native";
import { theme } from "../theme";
export const favoritesCityItemStyles = StyleSheet.create({
   container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cityBox: { flex: 1 },
  text: { fontSize: 16, fontWeight: "600", color: "#1E1E1E" },
  removeButton: {
    backgroundColor: "#F87171",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
