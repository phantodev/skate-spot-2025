import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração para dispositivos físicos
let scriptHostname;
if (__DEV__) {
	const { scriptURL } = NativeModules.SourceCode || {};
	scriptHostname = scriptURL
		? scriptURL.split("://")[1].split(":")[0]
		: "localhost";
}

Reactotron.configure({
	name: "Skate Spot 2025",
	host: scriptHostname || "localhost", // IP do seu computador na rede
	port: 9090,
})
	.setAsyncStorageHandler(AsyncStorage) // AsyncStorage é opcional
	.useReactNative({
		networking: true,
		editor: false,
		errors: { veto: (stackFrame) => false },
		overlay: false,
	})
	.connect();

// Adiciona o Reactotron ao objeto global para facilitar o uso
// Só disponível em ambiente de desenvolvimento
if (__DEV__) {
	console.tron = Reactotron;
}
