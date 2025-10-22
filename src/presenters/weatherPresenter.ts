export const formatTemperature = (temp: number) => `${temp.toFixed(1)}°C`;

export const getWeatherColor = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes("rain")) return "blue";
  if (desc.includes("sun") || desc.includes("clear")) return "orange";
  if (desc.includes("cloud")) return "gray";
  return "green";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
};