import { create } from "zustand";
import Cookies from "js-cookie";
import server from "../services/api";

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
      set({ user: data, token: data.token, isLoading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  logout: () => set({ user: null, token: null }),

  // Cart Slice
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const exist = state.cartItems.find((x) => x.id === product.id);
      if (exist) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...product, qty: 1 }] };
    }),
  removeFromCart: (product) =>
    set((state) => ({
      cartItems: state.cartItems.filter((x) => x.id !== product.id),
    })),
  clearCart: () => set({ cartItems: [] }),
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

export default useAppStore;
