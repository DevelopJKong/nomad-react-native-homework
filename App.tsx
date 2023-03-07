import React from "react";
import * as Font from "expo-font";
import { Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./navigation/Root";

const Stack = createNativeStackNavigator();
export default function App() {
  const [assets] = useAssets([require("./assets/profile.png")]);
  const [fonts] = Font.useFonts(Ionicons.font);
  const queryClient = new QueryClient();

  if (!assets || !fonts) {
    return <Text>Loading...</Text>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar style='light' />
            <NavigationContainer independent={true}>
              <Stack.Navigator>
                {/* 네비게이션 이용을 위해 Root에도 스택 감싸주기 */}
                <Stack.Screen name='Root' component={Root} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
