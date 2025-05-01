import { View, Text, Pressable } from "react-native";
import { supabase } from "../../configs/supabase";
import Toast from "react-native-toast-message";

export default function MyProfileScreen() {
  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Logout",
        text2: "Erro ao fazer logout",
      });
    }
  }
  return (
    <View className="flex-1 bg-zinc-900 flex justify-center items-center">
      <Text className="text-4xl text-white">
        <Pressable
          className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
          onPress={() => handleLogout()}
        >
          <Text className="text-white">Logout</Text>
        </Pressable>
      </Text>
    </View>
  );
}
