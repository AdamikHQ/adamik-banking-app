import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import MainAccountScreen from "../screens/MainAccountScreen";
import CryptoMenuScreen from "../screens/CryptoMenuScreen";
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

// Define RootStackParamList
export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="CryptoMenu"
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#FFA500",
        drawerActiveBackgroundColor: "rgba(255, 165, 0, 0.1)",
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

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider initialAccountId="000111230">
        <Drawer.Navigator
          initialRouteName="CryptoMenu"
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerActiveTintColor: "#FFA500",
            drawerActiveBackgroundColor: "rgba(255, 165, 0, 0.1)",
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
      </AccountProvider>
    </QueryClientProvider>
  );
}
