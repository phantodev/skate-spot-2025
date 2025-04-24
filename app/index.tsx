import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../assets/css/global";
import { useNavigation, useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titleLg}>SKATE SPOT CWB</Text>
      <Text style={styles.label}>Seja bem-vindo ao nosso app</Text>
      <View style={styles.containerForm}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          inputMode="email"
          style={styles.input}
          cursorColor="#ffffff"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} cursorColor="#ffffff" />
        <Pressable
          style={styles.button}
          onPress={() => console.log("DUDU")}
          accessibilityLabel="Faça seu login apertando aqui!"
        >
          <Text style={styles.label}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.buttonGhost}
          onPress={() => router.push("/signup")}
          accessibilityLabel="Faça seu login apertando aqui!"
        >
          <Text style={styles.label}>Quero me cadastrar</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" backgroundColor="#202020" />
    </View>
  );
}
