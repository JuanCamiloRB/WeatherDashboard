export const theme = {
  colors: {
    background: "#F7F7F7",
    card: "#FFFFFF",
    textPrimary: "#1E1E1E",
    textSecondary: "#6B7280",
    accent: "#2563EB",
    border: "#E5E7EB",
    accentLight: "#93C5FD",
  },
  spacing: (value: number) => value * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  shadow: {
    card: {
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
  },
};