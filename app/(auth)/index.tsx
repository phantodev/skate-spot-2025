import axios from "axios";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
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
} from "react-native";
import { supabase } from "../../configs/supabase";
import { useAuthStore } from "../../zustand/useAuthStore";
import Toast from "react-native-toast-message";
import Feather from '@expo/vector-icons/Feather';
import ListSkateSpots from "../../components/ListSkateSpots";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isFetchingCEP, setIsFetchingCEP] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { user } = useAuthStore();

  async function searchAddressByCEP() {
    try {
      setIsFetchingCEP(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if(response.data){
        setAddress(response.data.logradouro)
        setDistrict(response.data.bairro)
        setCity(response.data.localidade)
        setState(response.data.uf)
      };
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingCEP(false)
    }
  }

  async function handleSaveSpot(){
    try {
      setIsSubmitting(true)
      const { data, error } = await supabase
      .from('spots')
      .insert([
        { name, cep, address, district, city, state, user_id: user?.id },
      ])
      .select()

      if (error) {
        throw error;
      }

      if(data){
        Toast.show({
            type: "success",
            text1: "Cadastro",
            text2: "Spot cadastrado com sucesso",
        });
        setModalVisible(!modalVisible)
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Cadastro",
        text2: "Erro ao cadastrar spot",
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (cep.length === 8) {
      searchAddressByCEP();
    }
  }, [cep]);

  return (
<SafeAreaView className="flex-1 bg-zinc-900 pt-10">
    <View className="w-full flex-1 bg-zinc-900 flex justify-start items-start p-6">
          <ScrollView
              className="w-full flex-1"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                minHeight: "100%",
                width: "100%"
              }}
            >
      <Text className="text-4xl text-white">Seja bem-vindo</Text>
      <Text className="text-md text-white mt-4 px-4">
        Cadastre um SKATE SPOT do nosso app.
      </Text>
      <ListSkateSpots/>
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
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-zinc-900 flex-1 w-full h-full justify-center" >
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
                  <View className="w-full">
                    <Text className="text-white">Nome do SPOT</Text>
                    <TextInput
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="text"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      onChangeText={setName}
                      value={name}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">CEP</Text>
                    <View className="relative">
                      <TextInput
                        className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                        inputMode="text"
                        cursorColor="#ffffff"
                        autoCapitalize="none"
                        onChangeText={setCep}
                        value={cep}
                      />

                      {isFetchingCEP && (
                        <View className="absolute top-1/2 right-4 transform -translate-y-1/2"><ActivityIndicator size="small" color="#ffffff" /></View>
                      )}
                    </View>
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">Endereço</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="text"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      value={address}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">Bairro</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="text"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      value={district}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">Cidade</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="text"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      value={city}
                    />
                  </View>
                  <View className="w-full mt-2">
                    <Text className="text-white">Estado</Text>
                    <TextInput
                      readOnly
                      className="h-12 rounded-md bg-zinc-800 border-2 border-purple-500 w-full px-2 text-white mt-1"
                      inputMode="text"
                      cursorColor="#ffffff"
                      autoCapitalize="none"
                      value={state}
                    />
                  </View>
                  <Pressable
                    className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
                    onPress={() => handleSaveSpot()}
                  >
                    {!isSubmitting && <Text className="text-white">Cadastrar SPOT</Text>}
                    {isSubmitting && <Text className="text-white"><ActivityIndicator size="small" color="#ffffff" /></Text>}
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
    </ScrollView>
    </View>
    </SafeAreaView>
  );
}
