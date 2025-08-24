import { create } from "zustand";
import server from "../services/api";

const useStore = create((set) => ({
  products: [],
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
