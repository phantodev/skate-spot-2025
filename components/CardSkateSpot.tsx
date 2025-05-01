import { View, Text, Pressable } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { TSkateSpot } from "../types/skateSpot";

export default function CardSkateSpot({ spot }: { spot: TSkateSpot }) {
    return (
        <View id="skate-spot-card" className="w-full rounded-md bg-zinc-800 p-6 mt-4">
        <Text className="text-white text-xl font-semibold">{spot.name}</Text>
        <Text className="text-white">{spot.address} - {spot.district}</Text>
        <Text className="text-white">{spot.city} - {spot.state}</Text>
        <Pressable
                    className="bg-purple-500 rounded-md w-full h-12 flex justify-center items-center mt-10"
                    onPress={() => console.log()}
                  >
                  <View className="flex flex-row gap-2 justify-center items-center">
                    <Feather name="camera" size={24} color="white" />
                    <Text className="text-white">Vizualizar Fotos</Text>
                  </View>
        </Pressable>
      </View>
    )
}