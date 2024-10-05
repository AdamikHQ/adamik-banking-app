import React from "react";
import { View, StyleSheet } from "react-native";
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
      <View style={styles.drawerContent}>
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
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  logoutContainer: {
    // Add styles for the logout container if needed
  },
});

export default CustomDrawerContent;
