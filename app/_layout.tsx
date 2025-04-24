import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
