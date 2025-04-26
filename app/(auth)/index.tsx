import axios from "axios";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
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
} from "react-native";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  async function searchAddressByCEP() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (cep.length === 8) {
      searchAddressByCEP();
    }
  }, [cep]);

  return (
    <View className="flex-1 bg-zinc-900 flex justify-center items-center p-6">
      <Text className="text-4xl text-white">Seja bem-vindo</Text>
      <Text className="text-md text-white mt-4 px-4">
        Cadastre o primeiro SKATE SPOT do nosso app.
      </Text>
      <View className="flex justify-center items-center">
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("../../assets/skate.json")}
          autoPlay
          loop
        />
      </View>
      <TouchableHighlight
        onPress={() => setModalVisible(!modalVisible)}
        className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center"
      >
        <Text className="text-white font-semibold">Cadastrar um SPOT</Text>
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              className="w-full"
              contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View className="w-full flex flex-1 justify-center items-center">
                <View className="w-full flex flex-1 justify-center items-center bg-zinc-900 p-6">
                  <View className="w-full">
                    <Text className="text-white">Nome do SPOT</Text>
                    <TextInput
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      onChangeText={setName}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">CEP</Text>
                    <TextInput
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      onChangeText={setCep}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">Endereço</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      // onChangeText={setEmail}
                    />
                  </View>

                  <View className="w-full mt-2">
                    <Text className="text-white">Bairro</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      // onChangeText={setEmail}
                    />
                  </View>

                  <View className="w-full mt-2">
                    <Text className="text-white">Cidade</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      // onChangeText={setEmail}
                    />
                  </View>

                  <View className="w-full mt-2">
                    <Text className="text-white">Estado</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="email"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      // onChangeText={setEmail}
                    />
                  </View>

                  <Pressable
                    className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text className="text-white">Cadastrar SPOT</Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
