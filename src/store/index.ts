// src/store/index.ts
import { create } from 'zustand';

interface User {
  uid: string;
  phone: string;
  name?: string;
  email?: string;
  role: 'customer' | 'vendor' | 'agent';
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  icon: string;
}

interface AppState {
  // Auth
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;

  // Cart
  cart: CartItem[];
  selectedShop: any;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  deliveryTime: string;
  address: any;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setSelectedShop: (shop: any) => void;
  setSchedule: (pickup: string, pickupT: string, delivery: string, deliveryT: string) => void;
  setAddress: (address: any) => void;

  // Active order
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),

  cart: [],
  selectedShop: null,
  pickupDate: '',
  pickupTime: '',
  deliveryDate: '',
  deliveryTime: '',
  address: null,

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

  clearCart: () => set({ cart: [] }),

  setSelectedShop: (shop) => set({ selectedShop: shop }),

  setSchedule: (pickupDate, pickupTime, deliveryDate, deliveryTime) =>
    set({ pickupDate, pickupTime, deliveryDate, deliveryTime }),

  setAddress: (address) => set({ address }),

  activeOrderId: null,
  setActiveOrderId: (id) => set({ activeOrderId: id }),
}));
