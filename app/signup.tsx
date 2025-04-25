import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "../assets/css/global";
import { useRouter } from "expo-router";
import { supabase } from "../configs/supabase";
import { useEffect, useState } from "react";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotEquals, setPasswordNotEquals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp() {
    if (password !== confirmPassword) {
      return;
    }
    try {
      setIsLoading(true);
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (data) {
        setIsLoading(false);
        router.push("/confirm-signup");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCheckFields() {
    return email === "" || password === "" || confirmPassword === "";
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordNotEquals(false);
    } else {
      setPasswordNotEquals(true);
    }
  }, [password, confirmPassword]);
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
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, passwordNotEquals && styles.errorInputBorder]}
          cursorColor="#ffffff"
          onChangeText={setPassword}
        />
        {passwordNotEquals && (
          <Text style={styles.errorInputMessage}>Senhas devem ser iguais</Text>
        )}
        <Text style={styles.label}>Confirmar Password</Text>
        <TextInput
          style={[styles.input, passwordNotEquals && styles.errorInputBorder]}
          cursorColor="#ffffff"
          onChangeText={setConfirmPassword}
        />
        {passwordNotEquals && (
          <Text style={styles.errorInputMessage}>Senhas devem ser iguais</Text>
        )}
        <Pressable
          style={[styles.button, handleCheckFields() && { opacity: 0.5 }]}
          disabled={handleCheckFields()}
          onPress={() => handleSignUp()}
          accessibilityLabel="Faça seu login apertando aqui!"
        >
          {!isLoading && <Text style={styles.label}>Cadastre-me</Text>}
          {isLoading && <ActivityIndicator color={"#ffffff"} />}
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
