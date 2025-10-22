import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage helpers
export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error saving data:", err);
  }
};

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error reading data:", err);
    return null;
  }
};

// Capitalize first letter
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);