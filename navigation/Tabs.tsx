import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import React from "react";
import Coins from "../screens/Coins";
import News from "../screens/News";
import Prices from "../screens/Prices";
import { theme } from "../theme";
import DiscoverChoice from "../screens/DiscoverChoice";
import Discover from "../screens/Discover";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.color.pink,
        tabBarStyle: { backgroundColor: theme.bgColor, borderWidth: 0 },
      }}>
      <Tab.Group
        screenOptions={{
          headerTitleStyle: {
            color: theme.color.pink,
          },
          headerStyle: {
            backgroundColor: theme.bgColor,
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
          }}
        />
        <Tab.Screen
          name='News'
          component={News}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <Entypo name='news' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='Prices'
          component={Prices}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <FontAwesome name='money' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='DiscoverChoice'
          component={DiscoverChoice}
          options={{
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }): React.ReactNode => {
              return <FontAwesome name='heart-o' size={size} color={color} />;
            },
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default Tabs;
