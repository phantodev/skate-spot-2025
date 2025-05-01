import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";

type TAuthStore = {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  setAuth: (user: User, session: Session) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      setAuth: (user, session) =>
        set({
          user,
          session,
          isLoggedIn: true,
        }),
      clearAuth: () =>
        set({
          user: null,
          session: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-Storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
