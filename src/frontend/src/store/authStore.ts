import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, Role } from "../types";

interface AuthState extends AuthSession {
  login: (username: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      role: "student" as Role,
      isAuthenticated: false,

      login: (username: string, role: Role) =>
        set({ username, role, isAuthenticated: true }),

      logout: () =>
        set({ username: "", role: "student", isAuthenticated: false }),
    }),
    {
      name: "educampus-auth",
    },
  ),
);
