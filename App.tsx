import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";
import { store } from "./src/stores/weatherStore";
import { SafeAreaView } from "react-native-safe-area-context";

// Pantallas
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { SearchScreen } from "./src/screens/SearchScreen"; 
import { FavoritesScreen } from "./src/screens/FavoritesScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#2563EB",
            tabBarInactiveTintColor: "#9CA3AF",
            tabBarIcon: ({ color, size }) => {
              let iconName: string = "home-outline";

              if (route.name === "Home") iconName = "home-outline";
              else if (route.name === "Search") iconName = "search-outline";
              else if (route.name === "Favorites") iconName = "star-outline";
              else if (route.name === "History") iconName = "time-outline";

              return <Ionicons name={iconName} size={22} color={color} />;
            },
          })}
        >
          {/* 🏠 Dashboard principal */}
          <Tab.Screen name="Home" component={DashboardScreen} />

          {/* 🔍 Buscar clima por ciudad */}
          <Tab.Screen name="Search" component={SearchScreen} />

          {/* ⭐ Favoritos */}
          <Tab.Screen name="Favorites" component={FavoritesScreen} />

          {/* 🕓 Historial */}
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
