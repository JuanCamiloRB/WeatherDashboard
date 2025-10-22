import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { persistor, store } from "./src/stores/weatherStore";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
   <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <SafeAreaView style={{ flex: 1 }}>
      <DashboardScreen />
    </SafeAreaView>
  </PersistGate>
</Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
