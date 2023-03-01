import React from "react";
import * as Font from "expo-font";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [assets] = useAssets([require("./assets/profile.png")]);
  const [fonts] = Font.useFonts(Ionicons.font);
  if (!assets || !fonts) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Tabs />
    </NavigationContainer>
  );
}
