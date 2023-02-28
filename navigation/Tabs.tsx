import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name='Movie'
        component={Movie}
        options={{
          headerTitleStyle: {
            color: "white",
          },
        }}></Tab.Screen>
      <Tab.Screen name='Tv' component={Tv}></Tab.Screen>
      <Tab.Screen name='Search' component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
