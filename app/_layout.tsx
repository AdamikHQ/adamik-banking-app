import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountProvider } from "../providers/AccountProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider initialAccountId="">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AccountProvider>
    </QueryClientProvider>
  );
}
