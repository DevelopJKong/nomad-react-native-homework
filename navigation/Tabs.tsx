import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import React from "react";
import Coins from "../screens/Coins";
import News from "../screens/News";
import Prices from "../screens/Prices";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fd79a8",
        tabBarStyle: { backgroundColor: "#2d3436", borderWidth: 0 },
      }}>
      <Tab.Group
        screenOptions={{
          headerTitleStyle: {
            color: "#fd79a8",
          },
          headerStyle: {
            backgroundColor: "#2d3436",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}>
        <Tab.Screen
          name='Coins'
          component={Coins}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <FontAwesome name='bitcoin' size={size} color={color} />;
            },
          }}></Tab.Screen>
        <Tab.Screen
          name='News'
          component={News}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <Entypo name='news' size={size} color={color} />;
            },
          }}></Tab.Screen>
        <Tab.Screen
          name='Prices'
          component={Prices}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <FontAwesome name='money' size={size} color={color} />;
            },
          }}></Tab.Screen>
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default Tabs;
