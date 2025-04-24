import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../assets/css/global";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titleLg}>CADASTRE-SE</Text>
      <Text style={styles.label}>Façaa sua conta e aproveite hoje mesmo!</Text>
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
        <Text style={styles.label}>Confirmar Password</Text>
        <TextInput style={styles.input} cursorColor="#ffffff" />
        <Pressable
          style={styles.button}
          onPress={() => console.log("DUDU")}
          accessibilityLabel="Faça seu login apertando aqui!"
        >
          <Text style={styles.label}>Cadastre-me</Text>
        </Pressable>
        <Pressable
          style={styles.buttonGhost}
          onPress={() => router.push("/")}
          accessibilityLabel="Faça seu login apertando aqui!"
        >
          <Text style={styles.label}>Quero voltar para login</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" backgroundColor="#202020" />
    </View>
  );
}
