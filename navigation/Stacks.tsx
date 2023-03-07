import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetail from "../screens/CoinDetail";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackVisible: false,
        animation: "fade",
      }}>
      <Stack.Screen name='CoinDetail' component={CoinDetail} />
    </Stack.Navigator>
  );
};

export default Stacks;
