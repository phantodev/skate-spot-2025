import { Stack } from "expo-router";
import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import "../assets/css/global.css";

if (__DEV__) {
  require("../ReactotronConfig");
}

const { width } = Dimensions.get("window");

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          // Opções padrão para todas as telas
          contentStyle: { width },
          gestureEnabled: true,
          presentation: "card",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            // Opções específicas para a tela index
            animation: "slide_from_left", // Animação diferente para a tela index
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
            // Opções específicas para a tela signup
            animation: "slide_from_right", // Animação diferente para a tela signup
          }}
        />
        <Stack.Screen
          name="confirm-signup"
          options={{
            headerShown: false,
            // Opções específicas para a tela signup
            animation: "slide_from_right", // Animação diferente para a tela signup
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
      <Toast />
    </>
  );
}
