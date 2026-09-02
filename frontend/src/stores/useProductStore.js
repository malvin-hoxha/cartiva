import { create } from "zustand";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,
	error: null,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true, error: null });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...(prevState.products ?? []), res.data],
				loading: false,
			}));
			return res.data;
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to create product";
			set({ error: message, loading: false });
			throw error;
		}
	},

    fetchAllProducts: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get("/products");
			set({ products: response.data, loading: false });
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
			set({ error: message, loading: false });
		}
	},

    fetchProductsByCategory: async (category) => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data, loading: false });
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
			set({ error: message, loading: false });
		}
	},

    deleteProduct: async (productId) => {
		set({ loading: true, error: null });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: (prevProducts.products ?? []).filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to delete product";
			set({ error: message, loading: false });
		}
	},

    toggleFeaturedProduct: async (productId) => {
		set({ loading: true, error: null });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: (prevProducts.products ?? []).map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to update product";
			set({ error: message, loading: false });
		}
	},

	fetchFeaturedProducts: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
			set({ error: message, loading: false });
		}
	},

}));
