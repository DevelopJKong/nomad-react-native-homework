import React from "react";
import * as Font from "expo-font";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const [assets] = useAssets([require("./assets/profile.png")]);
  const [fonts] = Font.useFonts(Ionicons.font);
  const queryClient = new QueryClient();

  if (!assets || !fonts) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='light' />
        <Tabs />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
