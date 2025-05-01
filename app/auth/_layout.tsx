import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { supabase } from "../../configs/supabase";
import { Alert } from "react-native";
import { useAuthStore } from "../../zustand/useAuthStore";

export default function TabLayout() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  // Configurar o listener para mudanças no estado de autenticação
  const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      clearAuth();
      // Usar router.replace sem parâmetros adicionais
      // Vamos modificar o _layout.tsx principal para controlar a animação
      router.replace("/");
    }
  });
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#CC6CE7",
        tabBarStyle: {
          backgroundColor: "#1d1d1d",
          borderColor: "#CC6CE7",
          height: 80,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
