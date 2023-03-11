import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetail from "../screens/CoinDetail";
import { StatusBar } from "expo-status-bar";
import Discover from "../screens/Discover";
import DiscoverDrag from "../screens/DiscoverDrag";

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
      <Stack.Screen name='Discover' component={Discover} />
      <Stack.Screen name='DiscoverDrag' component={DiscoverDrag} />
    </Stack.Navigator>
  );
};

export default Stacks;
