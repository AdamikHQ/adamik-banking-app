import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAccount } from "../providers/AccountProvider";
// Remove or comment out the following line:
// import { RootStackParamList } from "../app/_layout";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  // Update the type annotation for navigation
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { setAccountId } = useAccount();

  const handleLogout = () => {
    setAccountId(""); // Clear the account ID
    navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <Icon.Button
          name="exit-to-app"
          backgroundColor="transparent"
          color="#000"
          onPress={handleLogout}
        >
          Logout
        </Icon.Button>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "flex-start", // Change this to align the logo to the left
    marginVertical: 20,
    marginRight: 20, // Add some right margin for better spacing
  },
  logo: {
    width: 255, // Increase width by 1.7 times (150 * 1.7 ≈ 255)
    height: 255, // Increase height by 1.7 times (150 * 1.7 ≈ 255)
  },
  logoutContainer: {
    // Add styles for the logout container if needed
  },
});

export default CustomDrawerContent;
