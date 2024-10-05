import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MainAccountScreen from "../screens/MainAccountScreen";
import CryptoMenuScreen from "../screens/CryptoMenuScreen";
import SplashScreen from "../screens/SplashScreen"; // Add this import
import { AccountProvider } from "../providers/AccountProvider";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

// Define DrawerParamList
export type DrawerParamList = {
  MainAccount: undefined;
  CryptoMenu: undefined;
};

// Update RootStackParamList
export type RootStackParamList = {
  Splash: undefined; // Add this line
  Login: undefined;
  MainDrawer: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MainAccount"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#FFA500",
        drawerActiveBackgroundColor: "rgba(247, 120, 3, 0.1)",
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="MainAccount"
        component={MainAccountScreen}
        options={{ title: "Main Account" }}
      />
      <Drawer.Screen
        name="CryptoMenu"
        component={CryptoMenuScreen}
        options={{
          title: "My Crypto Assets",
          headerTitle: "My Crypto Assets",
        }}
      />
    </Drawer.Navigator>
  );
}

function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider initialAccountId="000111230">
        <RootStackNavigator />
      </AccountProvider>
    </QueryClientProvider>
  );
}
