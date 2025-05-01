import { View } from "react-native";
import CardSkateSpot from "./CardSkateSpot";
import { supabase } from "../configs/supabase";
import { useEffect, useState } from "react";
import { TSkateSpot } from "../types/skateSpot";

export default function ListSkateSpots(){
    const [skateSpots, setSkateSpots] = useState<TSkateSpot[]>([]);
    async function getAllSkateSpots(){
        try {
            const { data, error } = await supabase.from('spots').select();
            if (error) {
                throw error;
            }
            
            if (data) {
                const listSpot: TSkateSpot[] = data;
                setSkateSpots(listSpot);
            } ;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllSkateSpots()
    },[])

    return (
        <View className="w-full">
            {skateSpots.map((spot) => (
                <CardSkateSpot key={spot.id} spot={spot} />
            ))}
        </View>
    )
}