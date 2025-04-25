import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../assets/css/global";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../configs/supabase";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);

  async function handleLogin() {
    if (email === "") {
      setEmailEmpty(true);
    }
    if (password === "") {
      setPasswordEmpty(true);
    }
    try {
      if (!emailEmpty && !passwordEmpty) {
        console.log(email);
        console.log(password);
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        console.log(data);
        console.log("Erro completo:", JSON.stringify(error));
        if (error?.code === "email_not_confirmed") {
          Alert.alert("Você ainda não confirmou seu e-mail!");
          return;
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (email !== "") {
      setEmailEmpty(false);
    }
    if (password !== "") {
      setPasswordEmpty(false);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleLg}>SKATE SPOT CWB</Text>
      <Text style={styles.label}>Seja bem-vindo ao nosso app</Text>
      <View style={styles.containerForm}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          inputMode="email"
          style={[styles.input, emailEmpty && styles.errorInputBorder]}
          cursorColor="#ffffff"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        {emailEmpty && (
          <Text style={styles.errorInputMessage}>E-mail é obrigatório!</Text>
        )}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, passwordEmpty && styles.errorInputBorder]}
          cursorColor="#ffffff"
          onChangeText={setPassword}
        />
        {passwordEmpty && (
          <Text style={styles.errorInputMessage}>Senha é obrigatória!</Text>
        )}
        <Pressable
          style={styles.button}
          onPress={() => handleLogin()}
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
