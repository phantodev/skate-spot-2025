import { ActivityIndicator, View } from "react-native";
import CardSkateSpot from "./CardSkateSpot";
import { supabase } from "../configs/supabase";
import { useEffect, useState } from "react";
import type { TSkateSpot } from "../types/skateSpot";
import Toast from "react-native-toast-message";

export default function ListSkateSpots({
	refetchSpots,
}: { refetchSpots: boolean }) {
	const [skateSpots, setSkateSpots] = useState<TSkateSpot[]>([]);
	const [isFetching, setIsFetchng] = useState(false);

	useEffect(() => {
		if (refetchSpots) {
			getAllSkateSpots();
		}
	}, [refetchSpots]);

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

	async function handleDeleteSpot(id: string) {
		const { error } = await supabase.from("spots").delete().eq("id", id);
		if (error) {
			Toast.show({
				type: "error",
				text1: "Erro ao deletar spot",
				text2: "Tente novamente 🤬",
			});
			return;
		}
		Toast.show({
			type: "success",
			text1: "Spot deletado com sucesso",
			text2: "O spot foi deletado com sucesso",
		});
		getAllSkateSpots();
	}

	useEffect(() => {
		getAllSkateSpots();
	}, []);

	return (
		<View className="w-full">
			{!isFetching &&
				skateSpots.length > 0 &&
				skateSpots.map((spot) => (
					<CardSkateSpot
						key={spot.id}
						spot={spot}
						onDelete={(id) => handleDeleteSpot(id)}
					/>
				))}
			{isFetching && (
				<View className="mt-10">
					<ActivityIndicator size="large" color="white" />
				</View>
			)}
		</View>
	);
}
