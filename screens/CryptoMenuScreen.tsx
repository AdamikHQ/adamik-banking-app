import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAccount } from "../providers/AccountProvider";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if not already installed
import Button from "../components/Button";

interface CryptoAsset {
  chainId: string;
  address: string;
  provider: string;
  balance: string;
  isSupported: boolean; // New property
}

const CryptoMenuScreen: React.FC = () => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { accountId } = useAccount();

  const fetchUserInfo = async () => {
    console.log("Fetching user info...");
    console.log("Current accountId:", accountId);
    setIsLoading(true);
    setAssets([]);
    setError(null);

    try {
      // Confirm that accountId is populated from the login screen
      if (!accountId) {
        throw new Error("Account ID is not available. Please log in again.");
      }

      console.log("Sending request with accountId:", accountId);

      const response = await fetch("https://cryptopod.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: accountId }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processedAssets = data.map((asset: CryptoAsset) => ({
        ...asset,
        isSupported: !(
          asset.provider === "fireblocks" && asset.chainId === "defi-kingdoms"
        ),
      }));
      setAssets(processedAssets);
    } catch (err) {
      console.error("Request failed:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      console.log("Request completed (success or failure)");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const getChainIcon = (chainId: string) => {
    const iconMap: { [key: string]: any } = {
      sepolia: require("../assets/ethereum.png"),
      "bitcoin-testnet": require("../assets/bitcoin.png"),
      tron: require("../assets/tron.png"),
      "avalanche-fuji": require("../assets/avalanche.png"),
      "defi-kingdoms": require("../assets/dfk.png"),
    };
    return iconMap[chainId] || require("../assets/default.png");
  };

  const getProviderLogo = (provider: string) => {
    const logoMap: { [key: string]: any } = {
      narval: require("../assets/narval.png"),
      fireblocks: require("../assets/fireblocks.png"),
      adamik: require("../assets/adamik.png"),
    };
    return logoMap[provider] || require("../assets/default.png");
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    // You might want to show a toast or some feedback that the address was copied
  };

  const getChainDisplayName = (chainId: string): string => {
    const displayNames: { [key: string]: string } = {
      sepolia: "Ethereum (test)",
      tron: "Tron",
      "bitcoin-testnet": "Bitcoin (test)",
      "avalanche-fuji": "Avalanche (test)",
      "defi-kingdoms": "Defi Kingdoms",
    };
    return displayNames[chainId] || chainId;
  };

  const getChainTicker = (chainId: string): string => {
    const tickers: { [key: string]: string } = {
      sepolia: "ETH",
      tron: "TRX",
      "bitcoin-testnet": "tBTC",
      "avalanche-fuji": "AVAX",
      "defi-kingdoms": "JEWEL",
    };
    return tickers[chainId] || "";
  };

  const renderAssetItem = ({ item }: { item: CryptoAsset }) => (
    <TouchableOpacity
      style={[
        styles.assetItem,
        !item.isSupported && styles.unsupportedAssetItem,
      ]}
      onPress={() => item.isSupported && copyToClipboard(item.address)}
      disabled={!item.isSupported}
    >
      <View style={styles.iconContainer}>
        <Image
          source={getChainIcon(item.chainId)}
          style={[
            styles.chainIcon,
            !item.isSupported && styles.unsupportedIcon,
          ]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.assetInfo}>
        <Text
          style={[
            styles.chainName,
            !item.isSupported && styles.unsupportedText,
          ]}
        >
          {getChainDisplayName(item.chainId)}
        </Text>
        <Text
          style={[styles.address, !item.isSupported && styles.unsupportedText]}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {item.address}
        </Text>
        <Text
          style={[styles.balance, !item.isSupported && styles.unsupportedText]}
        >
          Balance: {item.balance} {getChainTicker(item.chainId)}
        </Text>
      </View>
      <Image
        source={getProviderLogo(item.provider)}
        style={[
          styles.providerLogo,
          !item.isSupported && styles.unsupportedIcon,
        ]}
      />
      {!item.isSupported && (
        <View style={styles.unsupportedOverlay}>
          <Text style={styles.unsupportedOverlayText}>Not Supported</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  console.log("Rendering CryptoMenuScreen", { Response, error, isLoading });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Assets</Text>
        <TouchableOpacity
          onPress={fetchUserInfo}
          disabled={isLoading}
          style={styles.refreshButton}
        >
          <Ionicons
            name="refresh"
            size={24}
            color={isLoading ? "#999" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Refreshing...</Text>
          </View>
        )}
        {assets.length > 0 && (
          <FlatList
            data={assets}
            renderItem={renderAssetItem}
            keyExtractor={(item) => item.chainId}
            style={styles.assetList}
          />
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Error:</Text>
            <Text>{error}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Deposit"
            onPress={() => console.log("Deposit pressed")}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Withdraw"
            onPress={() => console.log("Withdraw pressed")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  responseContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#e6f7ff",
    borderRadius: 4,
  },
  responseTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#fff1f0",
    borderRadius: 4,
  },
  errorTitle: {
    fontWeight: "bold",
    color: "red",
    marginBottom: 8,
  },
  assetItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  chainIcon: {
    width: "100%",
    height: "100%",
  },
  assetInfo: {
    flex: 1,
  },
  chainName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  balance: {
    fontSize: 16,
    color: "#666",
  },
  providerLogo: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  assetList: {
    marginTop: 16,
  },
  refreshButton: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  unsupportedAssetItem: {
    opacity: 0.7, // Slightly increase opacity to make content more visible
  },
  unsupportedIcon: {
    opacity: 0.5,
  },
  unsupportedText: {
    color: "#999",
  },
  unsupportedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // More transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  unsupportedOverlayText: {
    color: "#333", // Even darker color for better visibility
    fontWeight: "bold",
    fontSize: 18, // Larger font size
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default CryptoMenuScreen;
