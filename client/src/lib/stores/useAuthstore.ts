import axiosInstance from "@/services/api";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface User {
  _id: string;
  username?: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSucces: boolean;
  registeruser: (newuser: User) => Promise<void>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}
const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  loading: false,
  error: null,
  isSucces: false,

  registeruser: async (newuser: User) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.post("/auth/register", newuser);
      const { user, token, refreshtoken } = response.data.data;
      Cookies.set("token", token);
      Cookies.set("refreshtoken", refreshtoken);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, loading: false, isSucces: true });
    } catch (error) {
      console.error("Error registering user:", error);
      set({ error: "Registration failed", loading: false, isSucces: false });
    }
  },

  loginUser: async ({ email, password }) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { user, token, refreshtoken } = response.data.data;
      Cookies.set("token", token);
      Cookies.set("refreshtoken", refreshtoken);
      localStorage.setItem("user", JSON.stringify(user)); // Persist user
      set({ user, loading: false, isSucces: true });
    } catch (error) {
      console.error("Error logging in:", error);
      set({
        error: "Login failed. Please check your credentials.",
        loading: false,
        isSucces: false,
      });
    }
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("refreshtoken");
    localStorage.removeItem("user");
    set({ user: null, isSucces: false });
  },

  checkAuth: () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        set({ user, isSucces: true });
      }
    }
  }

}
));
