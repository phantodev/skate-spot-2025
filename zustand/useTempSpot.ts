import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { TSkateSpot } from "../types/skateSpot";

type TTempSpotStore = {
	tempSpot: TSkateSpot | null;
	setTempSpot: (spot: TSkateSpot) => void;
	clearTempSpot: () => void;
};

export const useTempSpotStore = create<TTempSpotStore>()(
	persist(
		(set) => ({
			tempSpot: null,
			setTempSpot: (spot: TSkateSpot) =>
				set({
					tempSpot: spot,
				}),
			clearTempSpot: () =>
				set({
					tempSpot: null,
				}),
		}),
		{
			name: "temp-spot-Storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
