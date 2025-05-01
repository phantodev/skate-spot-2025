import {
	View,
	Text,
	TouchableHighlight,
	Modal,
	Alert,
	Pressable,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	SafeAreaView,
	Button,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import type { TSkateSpot } from "../types/skateSpot";
import { useEffect, useRef, useState } from "react";
import { type CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Toast from "react-native-toast-message";
import { supabase } from "../configs/supabase";

export default function CardSkateSpot({ spot }: { spot: TSkateSpot }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalCameraVisible, setModalCameraVisible] = useState(false);
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [photoURI, setPhotoURI] = useState<string | null>(null);
	const [photos, setPhotos] = useState<string[]>([]);

	useEffect(() => {
		if (photoURI) {
			uploadPhotoToSupabase();
		}
	}, [photoURI]);

	useEffect(() => {
		getPhotosFromSupabase();
	}, []);

	useEffect(() => {
		console.log(photos);
	}, [photos]);

	async function getPhotosFromSupabase() {
		try {
			const { data, error } = await supabase.storage
				.from("skate-spots")
				.list("eduardo-burko");

			// Limpar o estado de fotos antes de adicionar novas
			setPhotos([]);

			// Filtrar arquivos placeholder e adicionar apenas arquivos válidos
			if (data) {
				for (const item of data) {
					// Ignorar arquivos .emptyFolderPlaceholder
					if (item.name !== ".emptyFolderPlaceholder") {
						setPhotos((prev) => [...prev, item.name]);
					}
				}
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Erro ao buscar fotos",
				text2: "Não foi possível carregar as imagens",
			});
			console.error("Erro ao buscar fotos:", error);
		}
	}

	async function uploadPhotoToSupabase() {
		console.log("photoURI:", photoURI);
		try {
			if (!photoURI) {
				Toast.show({
					type: "error",
					text1: "Erro ao tirar foto",
					text2: "Nenhuma imagem disponível",
				});
				console.log("Erro: photoURI está vazio");
				return;
			}
			console.log("Iniciando upload da imagem para o Supabase");
			console.log("URI da foto:", photoURI);

			// Criar um objeto FormData com a imagem
			const formData = new FormData();
			formData.append("file", {
				uri: photoURI,
				type: "image/jpeg",
				name: "spot.jpg",
			} as any);

			// Nome do arquivo único usando timestamp
			const fileName = `eduardo-burko/spot-${Date.now()}.jpg`;
			console.log("Nome do arquivo a ser enviado:", fileName);

			// Upload do blob diretamente
			const { data, error } = await supabase.storage
				.from("skate-spots")
				.upload(fileName, formData, {
					contentType: "image/jpeg",
				});

			// Nem sempre precisamos executar a função abaixo
			if (data) {
				const {
					data: { publicUrl },
				} = supabase.storage.from("skate-spots").getPublicUrl(data.path);
				console.log(publicUrl);
			}

			if (error) {
				console.error("Erro no upload:", error);
			} else {
				setModalCameraVisible(false);
				setPhotoURI(null);
				getPhotosFromSupabase();
			}
		} catch (e) {
			console.error("Exceção durante o upload:", e);
			Toast.show({
				type: "error",
				text1: "Erro inesperado",
				text2: e instanceof Error ? e.message : "Erro desconhecido",
			});
		}
	}

	async function takePhoto() {
		try {
			const photo = await cameraRef.current?.takePictureAsync();
			if (!photo?.uri) {
				Toast.show({
					type: "error",
					text1: "Erro ao tirar foto",
					text2: "Tente novamente 🤬",
				});
				console.log("Erro ao tirar foto:", photo);
			} else {
				console.log("Foto tirada com sucesso:", photo);
				setPhotoURI(photo?.uri);
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Erro ao tirar foto",
				text2: "Tente novamente 🤬",
			});
		}
	}

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	async function handleGetPhoto() {
		setModalCameraVisible(false);
	}
	return (
		<View
			id="skate-spot-card"
			className="w-full rounded-md bg-zinc-800 p-6 mt-4"
		>
			<Text className="text-white text-xl font-semibold">{spot.name}</Text>
			<Text className="text-white">
				{spot.address} - {spot.district}
			</Text>
			<Text className="text-white">
				{spot.city} - {spot.state}
			</Text>
			<Pressable
				className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
				onPress={() => setModalVisible(true)}
			>
				<View className="flex justify-center">
					<Text className="text-white">Vizualizar Fotos</Text>
				</View>
			</Pressable>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View className="bg-zinc-900 flex-1 w-full h-full justify-center">
							<ScrollView
								keyboardShouldPersistTaps="handled"
								contentContainerStyle={{
									flexGrow: 1,
									justifyContent: "center",
									alignItems: "center",
									minHeight: "100%",
								}}
								className="w-full"
							>
								<View className="w-full flex justify-center items-center">
									<View className="w-full flex justify-center items-center bg-zinc-900 p-6">
										<Text className="text-4xl text-white w-fullflex justify-center">
											Fotos do SKATE SPOT
										</Text>
										<Text className="text-md text-white mt-4 px-4 w-full">
											Este SPOT ainda não possui fotos. Tira um agora!
										</Text>
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												flexWrap: "wrap",
												gap: 10,
												marginTop: 20,
											}}
										>
											{photos.length > 0 &&
												photos.map((photo) => (
													<Image
														key={photo}
														style={{ width: 100, height: 100 }}
														source={{
															uri: `https://rhbwvbwoxymzgvlvqbou.supabase.co/storage/v1/object/public/skate-spots/eduardo-burko/${photo}`,
														}}
													/>
												))}
										</View>
										<Pressable
											className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
											onPress={() => setModalCameraVisible(true)}
										>
											<Text className="text-white">Tirar uma Foto</Text>
										</Pressable>
									</View>
								</View>
							</ScrollView>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</Modal>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalCameraVisible}
				onRequestClose={() => {
					setModalCameraVisible(false);
				}}
			>
				<SafeAreaView style={{ flex: 1 }}>
					{!permission.granted ? (
						<View style={styles.container}>
							<Text
								style={{
									color: "white",
									marginBottom: 20,
									textAlign: "center",
								}}
							>
								Nós precisamos da permissão para mostrar sua câmera
							</Text>
							<Button onPress={requestPermission} title="Permitir Acesso" />
						</View>
					) : (
						<View style={{ flex: 1 }}>
							<CameraView
								ref={cameraRef}
								style={styles.camera}
								className="flex-1 w-screen h-screen"
								facing={facing}
							>
								<View style={styles.buttonContainer}>
									<TouchableOpacity
										style={styles.flipButton}
										onPress={() =>
											setFacing(facing === "back" ? "front" : "back")
										}
									>
										<Text style={styles.text}>Flip Camera</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.flipButton}
										onPress={() => takePhoto()}
									>
										<Text style={styles.text}>Capturar</Text>
									</TouchableOpacity>
								</View>

								<TouchableOpacity
									style={styles.closeButton}
									onPress={() => setModalCameraVisible(false)}
								>
									<Feather name="x" size={24} color="white" />
								</TouchableOpacity>
							</CameraView>
						</View>
					)}
				</SafeAreaView>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
		padding: 20,
	},
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	buttonContainer: {
		flex: 1,
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		gap: 16,
		justifyContent: "center",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	flipButton: {
		alignSelf: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 10,
		borderRadius: 10,
	},
	closeButton: {
		position: "absolute",
		top: 40,
		right: 20,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 10,
		borderRadius: 20,
	},
});
