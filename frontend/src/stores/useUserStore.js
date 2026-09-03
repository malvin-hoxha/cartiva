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
			set({ user: res.data.user, loading: false });
		} catch (error) {
			set({ loading: false });
		}
    },

    login: async (email, password) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data.user, loading: false });
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
    },

    refreshToken: async () => {
        await axios.post("/auth/refresh-token");
    }
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const isRefreshRequest = originalRequest?.url === "/auth/refresh-token";

		if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
