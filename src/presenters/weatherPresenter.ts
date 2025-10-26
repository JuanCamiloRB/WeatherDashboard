export const formatTemperature = (
  temp: number,
  unit: "metric" | "imperial" = "metric"
): string => {
  if (temp == null || isNaN(temp)) return "--";

  const value =
    unit === "metric"
      ? temp.toFixed(1) // Celsius
      : ((temp * 9) / 5 + 32).toFixed(1); // Convierte a Fahrenheit si el valor original está en °C

  const symbol = unit === "metric" ? "°C" : "°F";
  return `${value}${symbol}`;
};

export const getWeatherColor = (description: string) => {
  const desc = description.toLowerCase();
  if (desc.includes("rain")) return "blue";
  if (desc.includes("sun") || desc.includes("clear")) return "orange";
  if (desc.includes("cloud")) return "gray";
  return "green";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
export const formatLocalTime = (timestampSeconds?: number, timezoneOffsetSeconds?: number): string => {
  if (!timestampSeconds || timezoneOffsetSeconds === undefined || timezoneOffsetSeconds === null) return "--";

  // timestampSeconds: p.ej. sys.sunrise (UTC seconds)
  // timezoneOffsetSeconds: p.ej. timezone (segundos offset desde UTC para la ciudad)
  // Construimos un instante UTC ajustado al timezone de la ciudad:
  const adjustedMs = (timestampSeconds + timezoneOffsetSeconds) * 1000;

  // Creamos Date a partir de ese instante (Date guarda ms desde epoch absoluto)
  const adjustedDate = new Date(adjustedMs);

  // Usamos getUTCHours / getUTCMinutes para evitar que el dispositivo aplique su propia TZ.
  const hoursUTC = adjustedDate.getUTCHours();
  const minutesUTC = adjustedDate.getUTCMinutes();

  // Convertimos a formato 12h (opcional) — o deja 24h si prefieres.
  const ampm = hoursUTC >= 12 ? "PM" : "AM";
  const hours12 = hoursUTC % 12 === 0 ? 12 : hoursUTC % 12;
  const minutesPadded = minutesUTC.toString().padStart(2, "0");

  return `${hours12}:${minutesPadded} ${ampm}`;
};