import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Stack = createNativeStackNavigator();

const coinScreens = [
  <Stack.Screen key={"Tabs"} name='Tabs' component={Tabs} />,
  <Stack.Screen key={"Stacks"} name='Stacks' component={Stacks} />,
];

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}>
      {coinScreens}
    </Stack.Navigator>
  );
};

export default Root;
