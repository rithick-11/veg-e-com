import { create } from "zustand";
import server from "../services/api";

const useStore = create((set) => ({
  products: [],
  login: async (email, password) => {
    try {
      const response = await server.post("/users/login", { email, password });
      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to log in:", error);
      throw error;
    }
  },
  signup: async (name, email, password) => {
    try {
      const response = await server.post("/users/signup", {
        name,
        email,
        password,
      });
      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error("Failed to sign up:", error);
      throw error;
    }
  },
  fetchProducts: async () => {
    try {
      const response = await server.get("/products");
      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  addProduct: async (productData) => {
    try {
      const response = await server.post("/products", productData);
      set((state) => ({ products: [...state.products, response.data] }));
      return response.data;
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  },
}));

export default useStore;
