import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { styles } from "../assets/css/global";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleLg, { marginBottom: 20 }]}>
        CADASTRO EFETUADO
      </Text>
      <Text style={styles.description}>
        Confirme o link que enviamos em seu e-mail e faça o login após a
        confirmação
      </Text>
      <View style={styles.containerLottie}>
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("../assets/skate.json")}
          autoPlay
          loop
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/")}
        accessibilityLabel="Faça seu login apertando aqui!"
      >
        <Text style={styles.label}>Voltar para o Login</Text>
      </Pressable>
      <StatusBar style="auto" backgroundColor="#202020" />
    </View>
  );
}
