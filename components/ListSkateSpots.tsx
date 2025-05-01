import { ActivityIndicator, View } from "react-native";
import CardSkateSpot from "./CardSkateSpot";
import { supabase } from "../configs/supabase";
import { useEffect, useState } from "react";
import { TSkateSpot } from "../types/skateSpot";

export default function ListSkateSpots() {
  const [skateSpots, setSkateSpots] = useState<TSkateSpot[]>([]);
  const [isFetching, setIsFetchng] = useState(false);

  async function getAllSkateSpots() {
    try {
      setIsFetchng(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const { data, error } = await supabase.from("spots").select();
      if (error) {
        throw error;
      }

      if (data) {
        const listSpot: TSkateSpot[] = data;
        setSkateSpots(listSpot);
        setIsFetchng(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllSkateSpots();
  }, []);

  return (
    <View className="w-full">
      {!isFetching &&
        skateSpots.length > 0 &&
        skateSpots.map((spot) => <CardSkateSpot key={spot.id} spot={spot} />)}
      {isFetching && (
        <View className="mt-10">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
}
