import axiosInstance from "@/services/api";
import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
    username?: string;
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    registeruser: (newuser: User) => Promise<void>;
    loginUser: (credentials: { email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    registeruser: async (newuser: User) => {
        set({ loading: true, error: null });

        try {
            const response = await axiosInstance.post("/auth/register", newuser);
            const { user, token, refreshtoken } = response.data.data;
            Cookies.set("token", token);
            Cookies.set("refreshtoken", refreshtoken);
            set({ user, loading: false });
        } catch (error) {
            console.error("Error registering user:", error);
            set({ error: "Registration failed", loading: false });
        }
    },

    loginUser: async ({ email, password }) => {
        set({ loading: true, error: null });

        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            const { user, token, refreshtoken } = response.data.data;
            Cookies.set("token", token);
            Cookies.set("refreshtoken", refreshtoken);
            set({ user, loading: false });
        } catch (error) {
            console.error("Error logging in:", error);
            set({ error: "Login failed. Please check your credentials.", loading: false });
        }
    }
}));
