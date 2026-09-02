import { create } from "zustand";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return;
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
		}
    },

    login: async (email, password) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
        } catch (error) {
            console.log(error);
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });

        try {
            const response = await axios.get("/auth/profile");
            set({user: response.data, checkingAuth: false});
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    }
}));