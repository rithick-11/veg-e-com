import { create } from "zustand";
import Cookies from "js-cookie";
import server, { setToken } from "../services/api";
import toast from "react-hot-toast";

export const cookieStorage = {
  getItem: (name) => {
    return Cookies.get(name) || null;
  },
  setItem: (name, value) => {
    Cookies.set(name, value, { expires: 7, path: "/" });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};

const useAppStore = create((set, get) => ({
  // Auth Slice
  user: null,
  token: null,
  isLoading: false,
  error: null,
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.post("/users/signup", {
        name,
        email,
        password,
      });
      cookieStorage.setItem("veg-token", data.token);
      setToken(data.token);
      set({ user: data, token: data.token, isLoading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.post("/users/login", {
        email,
        password,
      });
      cookieStorage.setItem("veg-token", data.token);
      setToken(data.token);
      set({
        user: data,
        token: data.token,
        isLoading: false,
        products: data.products,
      });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  logout: () => {
    set({ user: null, token: null });
    cookieStorage.removeItem("veg-token");
    setToken(null);
  },

  // Cart Slice
  cartItems: [],
  products: [],
  getCart: async () => {
    try {
      const { data } = await server.get("/cart");
      set({ cartItems: data.items });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  },
  addToCart: async (productId, quantity) => {
    try {
      const { data } = await server.post("/cart", { productId, quantity });
      set({ cartItems: data.items });
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  },
  removeFromCart: async (productId) => {
    try {
      const { data } = await server.delete(`/cart/${productId}`);
      set({ cartItems: data.items });
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove from cart:", error);

      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  },
  updateCartQuantity: async (productId, quantity) => {
    try {
      const { data } = await server.put(`/cart/${productId}`, { quantity });
      set({ cartItems: data.items });
      toast.success("Cart updated");
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  },
  clearCart: async () => {
    try {
      await server.delete("/cart");
      set({ cartItems: [] });
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    }
  },
  fetchProducts: async () => {
    if (get().products.length > 0) return;
    try {
      const response = await server.get("/products");
      set({ products: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart");
      console.error("Failed to fetch products:", error);
    }
  },
  addProduct: async (productData) => {
    try {
      const response = await server.post("/products", productData);
      set((state) => ({ products: [...state.products, response.data] }));
      toast.success("Product added successfully!");
      return response.data;
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(error.response?.data?.message || "Failed to fetch cart");
      throw error;
    }
  },
}));

export default useAppStore;
