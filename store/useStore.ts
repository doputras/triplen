import { create } from 'zustand';

interface StoreState {
  // UI state only - Cart state is managed by CartContext
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  // UI state
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));
