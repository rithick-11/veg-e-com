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
  isUserLoading: true, // New state for user loading status
  users: [], // New state for admin user management
  orders: [], // New state for admin order management
  currentOrder: null, // For viewing a single order's details
  myOrders: [], // New state for user's own orders
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
      set({ user: data.user, token: data.token, isLoading: false });
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
        user: data.user,
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
  logout: async () => {
    set({ user: null, token: null });
    cookieStorage.removeItem("veg-token");
    get().fetchProducts();
    setToken(null);
  },
  loadUser: async () => {
    set({ isUserLoading: true }); // Set loading to true
    const token = cookieStorage.getItem("veg-token");
    if (token) {
      setToken(token);
      try {
        // Assuming the profile endpoint returns the user object directly
        const res = await server.get("/users/profile");
        console.log(res);
        set({ user: res.data, token, isUserLoading: false }); // Set loading to false on success
      } catch (error) {
        console.error("Failed to load user", error);
        get().logout();
        set({ isUserLoading: false }); // Set loading to false on error
      }
    } else {
      set({ isUserLoading: false }); // Set loading to false if no token
    }
  },

  // Admin User Management
  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.get("/users");
      set({ users: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },
  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.put(`/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((user) => (user._id === id ? data : user)),
        isLoading: false,
      }));
      toast.success("User updated successfully!");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await server.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        isLoading: false,
      }));
      toast.success("User deleted successfully!");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },

  // Admin Order Management
  getAllOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.get("/orders");
      set({ orders: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },
  getMyOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.get("/orders/myorders");
      set({ myOrders: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },
  getOrderDetails: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.get(`/orders/${id}`);
      set({ currentOrder: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error; // Re-throw so the component can handle navigation/UI changes
    }
  },
  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const { cartItems } = get();
      if (cartItems.length === 0) {
        toast.error("Your cart is empty.");
        throw new Error("Cart is empty");
      }

      const orderPayload = {
        ...orderData, // Contains shippingAddress, etc.
        orderItems: cartItems.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.images[0], // Assuming the first image is the main one
          price: item.product.finalPrice,
          product: item.product._id, // Pass the product ID
        })),
      };

      const { data } = await server.post("/orders", orderPayload);
      toast.success("Order placed successfully!");
      get().clearCart(); // Clear cart after successful order
      set({ isLoading: false, currentOrder: data, myOrders: [...get().myOrders, data] });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to place order.";
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  updateOrder: async (id, orderData) => {
    const { data } = await server.put(`/orders/${id}`, orderData);
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === id ? data : order
      ),
    }));
  },
  deleteOrder: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await server.delete(`/orders/${id}`);
      set((state) => ({
        orders: state.orders.filter((order) => order._id !== id),
        isLoading: false,
      }));
      toast.success("Order deleted successfully!");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },

  // Admin Product Management
  getAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.get("/products/admin");
      set({ products: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },
  createProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.post("/products", productData);
      set((state) => ({
        products: [...state.products, data],
        isLoading: false,
      }));
      toast.success("Product added successfully!");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await server.put(`/products/${id}`, productData);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data : product
        ),
        isLoading: false,
      }));
      toast.success("Product updated successfully!");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await server.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        isLoading: false,
      }));
      toast.success("Product deleted successfully!");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      toast.error(message);
      throw error;
    }
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
    const { data } = await server.post("/cart", { productId, quantity });
    let products = get().products.map((p) => {
      if (p._id === productId) {
        return { ...p, quantity: quantity, inCart: true };
      }
      return p;
    });
    set({
      cartItems: data.items,
      products: products,
    });
  },
  removeFromCart: async (productId) => {
    const { data } = await server.delete(`/cart/${productId}`);
    set({ cartItems: data.items });
  },
  updateCartQuantity: async (productId, quantity) => {
    const { data } = await server.put(`/cart/${productId}`, { quantity });
    set((state) => ({
      cartItems: data.items,
      products: state.products.map((p) =>
        p._id === productId
          ? { ...p, quantity: quantity, inCart: quantity > 0 }
          : p
      ),
    }));
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
    // This fetchProducts is for the public view, not admin
    if (get().products.length > 0) return;
    try {
      const response = await server.get("/products");
      set({ products: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart");
      console.error("Failed to fetch products:", error);
    }
  },
  getProductById: async (productId) => {
    try {
      console.log("Fetching product from server:", productId);
      const response = await server.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart");
      console.error("Failed to fetch products:", error);
      return {};
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