import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../assets/css/global";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../configs/supabase";
import Toast from "react-native-toast-message";
import { useAuthStore } from "../zustand/useAuthStore";

export default function LoginScreen() {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
	const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
	const { setAuth, clearAuth, user, session, isLoggedIn } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	// Verificar se já existe uma sessão ativa no Supabase
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const checkSession = async () => {
			try {
				// Obter a sessão atual do Supabase
				const { data } = await supabase.auth.getSession();

				// Se existir uma sessão, atualizar o estado de autenticação e redirecionar
				if (data?.session) {
					setAuth(data.session.user, data.session);
					router.replace("/auth");
				}
			} catch (error) {
				console.error("Erro ao verificar sessão:", error);
				clearAuth();
			} finally {
				setIsLoading(false);
			}
		};

		// Configurar o listener para mudanças no estado de autenticação
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === "SIGNED_IN" && session) {
					setAuth(session.user, session);
					router.replace("/auth");
				}
			},
		);

		checkSession();

		// Limpar o listener quando o componente for desmontado
		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

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
				if (data.session === null) {
					Toast.show({
						type: "error",
						text1: "Login inválido",
						text2: "Verifique suas credenciais 🤬",
					});
				} else {
					setAuth(data.user, data.session);
				}
				if (error?.code === "email_not_confirmed") {
					Toast.show({
						type: "error",
						text1: "E-mail não confirmado",
						text2: "Acesse seu e-mail e clique no link 🤬",
					});
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
