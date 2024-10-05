import React, { useState } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

const CryptoMenuScreen: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeTestRequest = async () => {
    console.log("Making test request...");
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      console.log(
        "Sending POST request to https://jsonplaceholder.typicode.com/posts"
      );
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST", // Change to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "foo",
            body: "bar",
            userId: 1,
          }), // Add body for POST request
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Request successful.");
      console.log("Response data:", JSON.stringify(data));
      setResponse(JSON.stringify(data, null, 2));
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

  console.log("Rendering CryptoMenuScreen", { response, error, isLoading });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Test API Request</Text>
      <Button
        title={isLoading ? "Loading..." : "Make Test Request"}
        onPress={makeTestRequest}
        disabled={isLoading}
      />
      {isLoading && <Text>Making request...</Text>}
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Response:</Text>
          <Text>{response}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error:</Text>
          <Text>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default CryptoMenuScreen;
