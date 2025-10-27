export const formatTemperature = (
  temp: number,
  unit: "metric" | "imperial" = "metric"
): string => {
  if (temp == null || isNaN(temp)) return "--";

  const value =
    unit === "metric"
      ? temp.toFixed(1) // Celsius
      : ((temp * 9) / 5 + 32).toFixed(1); // trying to conver to farhenheit

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

//trying to convert is there is a offset per city
  const adjustedMs = (timestampSeconds + timezoneOffsetSeconds) * 1000;

  // create date
  const adjustedDate = new Date(adjustedMs);

  // if we are using geolocationg we try to unable that
  const hoursUTC = adjustedDate.getUTCHours();
  const minutesUTC = adjustedDate.getUTCMinutes();

  // converting to 12h format
  const ampm = hoursUTC >= 12 ? "PM" : "AM";
  const hours12 = hoursUTC % 12 === 0 ? 12 : hoursUTC % 12;
  const minutesPadded = minutesUTC.toString().padStart(2, "0");

  return `${hours12}:${minutesPadded} ${ampm}`;
};