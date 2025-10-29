import { StyleSheet } from "react-native";
import { theme } from "../theme";
export const searchScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  suggestionText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  infoText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  examplesContainer: {
    marginTop: 20,
    width: "100%",
    gap: 12,
  },
  exampleCardWrapper: {
    marginBottom: 12,
  },
  searchBarContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
},

inputWrapper: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F3F4F6",
  borderRadius: 8,
  paddingHorizontal: 10,
  height: 40,
},

icon: {
  marginRight: 6,
},


searchButton: {
  marginLeft: 8,
  backgroundColor: "#6B7280",
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 8,
},

searchButtonText: {
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: 14,
},
});