import { create } from 'zustand';
import { CartItem } from '../types';

interface CartStore {
  items: CartItem;
  addToCart: (quantity: number) => void;
  removeFromCart: (quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: { quantity: 0 },
  addToCart: (quantity) => 
    set((state) => ({ 
      items: { quantity: state.items.quantity + quantity } 
    })),
  removeFromCart: (quantity) =>
    set((state) => ({
      items: { quantity: Math.max(0, state.items.quantity - quantity) }
    })),
  clearCart: () => set({ items: { quantity: 0 } }),
}));