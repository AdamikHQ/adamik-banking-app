import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import MainAccountScreen from "../screens/MainAccountScreen";
import CryptoMenuScreen from "../screens/CryptoMenuScreen";
import { AccountProvider } from "../providers/AccountProvider";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "../screens/SplashScreen";

// Create a client
const queryClient = new QueryClient();

// Update the RootStackParamList
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainDrawer: undefined;
};

// Define DrawerParamList
export type DrawerParamList = {
  MainAccount: undefined;
  CryptoMenu: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="CryptoMenu"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MainAccount"
        component={MainAccountScreen}
        options={{ title: "Main Account" }}
      />
      <Drawer.Screen
        name="CryptoMenu"
        component={CryptoMenuScreen}
        options={{ title: "My Crypto Assets" }}
      />
    </Drawer.Navigator>
  );
};

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider initialAccountId="1111111111">
        <Stack.Navigator initialRouteName="MainDrawer">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AccountProvider>
    </QueryClientProvider>
  );
}
