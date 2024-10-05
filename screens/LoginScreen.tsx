import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/MaterialIcons"; // Make sure to install this package
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/types"; // Update this import
import { useAccount } from "../providers/AccountProvider"; // Add this import

// Remove the following line:
// Define the RootStackParamList type

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [keypadNumbers, setKeypadNumbers] = useState<number[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Remove the accountInputRef

  const handleKeypadPress = (number: number) => {
    setPinCode((prevPinCode) => {
      if (prevPinCode.length < 6) {
        return prevPinCode + number.toString();
      }
      return prevPinCode;
    });
  };

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { setAccountId } = useAccount(); // Update this line

  const handleLogin = () => {
    if (accountNumber.length < 10) {
      setErrorMessage("Account number must be 10 digits");
    } else if (pinCode.length < 6) {
      setErrorMessage("PIN code must be 6 digits");
    } else {
      setErrorMessage(null);
      // Update the account context with the account number
      setAccountId(accountNumber); // Update this line
      navigation.navigate("MainDrawer"); // Navigate to MainDrawer instead of MainAccount
      // Reset fields and regenerate keypad
      setAccountNumber("");
      setPinCode("");
      generateRandomKeypad();
    }
  };

  const generateRandomKeypad = useCallback(() => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    setKeypadNumbers(numbers.sort(() => Math.random() - 0.5));
  }, []);

  // Generate keypad numbers on component mount
  React.useEffect(() => {
    generateRandomKeypad();
  }, [generateRandomKeypad]);

  const handleAccountNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const limitedText = numericText.slice(0, 10);
    setAccountNumber(limitedText);
  };

  const handleAccountNumberFocus = () => {
    setShowKeyboard(true);
  };

  const handleAccountNumberBlur = () => {
    setShowKeyboard(false);
  };

  const clearPinCode = () => {
    setPinCode("");
  };

  const renderKeypad = () => {
    return (
      <View style={styles.keypadContainer}>
        {keypadNumbers.map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.keypadButton}
            onPress={() => handleKeypadPress(number)}
          >
            <Text style={styles.keypadButtonText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPinCode = () => {
    return (
      <View style={styles.pinCodeContainer}>
        <View style={styles.pinCodeRow}>
          <Text style={styles.pinCodeLabel}>PIN Code</Text>
          <View style={styles.pinCodeDisplay}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.pinDot}>
                {index < pinCode.length && <View style={styles.pinDotFilled} />}
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={clearPinCode} style={styles.clearButton}>
            <Icon name="backspace" size={24} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={[styles.logo, { width: 280, height: 140 }]} // Increased size by 1.4
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter your client number and pin code</Text>
      <Input
        // Remove the ref prop
        placeholder="Account Number"
        onChangeText={handleAccountNumberChange}
        value={accountNumber}
        keyboardType="numeric"
        maxLength={10}
        onFocus={handleAccountNumberFocus}
        onBlur={handleAccountNumberBlur}
      />
      {renderPinCode()}
      {!showKeyboard && renderKeypad()}
      <Button title="Submit" onPress={handleLogin} />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => console.log("Forgot PIN")}>
          <Text style={styles.link}>Forgot your pin?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Forgot Account ID")}>
          <Text style={styles.link}>Forgot your account id?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  keypadButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
  },
  keypadButtonText: {
    fontSize: 24,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  link: {
    color: "#F77803",
    textDecorationLine: "underline",
  },
  pinCodeContainer: {
    width: "100%",
    marginBottom: 20,
  },
  pinCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10, // Add some space between Account Number and PIN Code
  },
  pinCodeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  pinCodeDisplay: {
    flexDirection: "row",
    flex: 1,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  pinDotFilled: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: "red",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
});

export default LoginScreen;
