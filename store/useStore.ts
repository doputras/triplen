import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductColor, ProductSize } from '@/types';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: ProductSize['size'], quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  updateQuantity: (productId: string, colorName: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // UI state
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial cart state
      cart: [],

      // Cart actions
      addToCart: (product, selectedColor, selectedSize, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor.name === selectedColor.name &&
              item.selectedSize === selectedSize
          );

          if (existingItemIndex > -1) {
            // Update quantity if item exists
            const newCart = [...state.cart];
            newCart[existingItemIndex].quantity += quantity;
            return { cart: newCart };
          } else {
            // Add new item
            return {
              cart: [
                ...state.cart,
                {
                  product,
                  selectedColor,
                  selectedSize,
                  quantity,
                },
              ],
            };
          }
        });
      },

      removeFromCart: (productId, colorName, size) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor.name === colorName &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, colorName, size, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.selectedColor.name === colorName &&
                    item.selectedSize === size
                  )
              ),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.product.id === productId &&
              item.selectedColor.name === colorName &&
              item.selectedSize === size
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // UI state
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    }),
    {
      name: 'triplen-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
