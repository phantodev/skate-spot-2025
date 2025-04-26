import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";

type TAuthStore = {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  setAuth: (user: User, session: Session) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
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
}));
