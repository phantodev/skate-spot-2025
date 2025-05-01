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
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            // Desativando a animação para a tela de login
            animation: "none", // Sem animação para evitar transição ao fazer logout
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
      </Stack>
      <Toast />
    </>
  );
}
