'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import type { Product, ProductColor } from '@/types'

interface CartItem {
  id: string
  product: Product
  selectedColor: ProductColor
  selectedSize: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  loading: boolean
  addToCart: (product: Product, color: ProductColor, size: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartTotal: () => number
  getCartCount: () => number
  syncCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Load cart on mount and when user changes
  useEffect(() => {
    syncCart()
  }, [user])

  // Sync cart with database or localStorage
  const syncCart = async () => {
  setLoading(true)
  try {
    if (user) {
      // Fetch cart from database
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        
        // Add validation for data structure
        if (data && Array.isArray(data.items)) {
          const cartItems = data.items
            .filter((item: any) => item && item.products) // Filter out invalid items
            .map((item: any) => ({
              id: item.id,
              product: item.products,
              selectedColor: item.products.colors?.find((c: any) => c.name === item.selected_color) || item.products.colors?.[0] || null,
              selectedSize: item.selected_size,
              quantity: item.quantity,
            }))
            .filter((item: CartItem) => item.selectedColor !== null) // Remove items without valid color
          
          setCart(cartItems)
        } else {
          console.warn('Invalid cart data structure:', data)
          setCart([])
        }
      } else {
        console.error('Failed to fetch cart:', response.status)
        setCart([])
      }
    } else {
      // Load from localStorage for anonymous users
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        try {
          const parsedCart = JSON.parse(localCart)
          setCart(Array.isArray(parsedCart) ? parsedCart : [])
        } catch (parseError) {
          console.error('Error parsing localStorage cart:', parseError)
          localStorage.removeItem('cart')
          setCart([])
        }
      } else {
        setCart([])
      }
    }
  } catch (error) {
    console.error('Error syncing cart:', error)
    setCart([]) // Reset cart on error
  } finally {
    setLoading(false)
  }
}

  // Add item to cart
  const addToCart = async (product: Product, color: ProductColor, size: string, quantity: number) => {
    if (user) {
      // Add to database
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: product.id,
            quantity,
            selected_color: color.name,
            selected_size: size,
          }),
        })

        if (response.ok) {
          await syncCart()
        }
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      // Add to localStorage
      const existingItem = cart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      )

      let newCart: CartItem[]
      if (existingItem) {
        newCart = cart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newCart = [
          ...cart,
          {
            id: `${product.id}-${color.name}-${size}-${Date.now()}`,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ]
      }

      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (user) {
      // Remove from database
      try {
        const response = await fetch(`/api/cart?item_id=${itemId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await syncCart()
        }
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    } else {
      // Remove from localStorage
      const newCart = cart.filter((item) => item.id !== itemId)
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId)
      return
    }

    if (user) {
      // Update in database
      try {
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item_id: itemId, quantity }),
        })

        if (response.ok) {
          await syncCart()
        }
      } catch (error) {
        console.error('Error updating quantity:', error)
      }
    } else {
      // Update in localStorage
      const newCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (user) {
      // Clear database cart by removing all items
      try {
        const itemsToRemove = cart.map((item) => item.id)
        await Promise.all(
          itemsToRemove.map((id) => fetch(`/api/cart?item_id=${id}`, { method: 'DELETE' }))
        )
        setCart([])
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    } else {
      setCart([])
      localStorage.removeItem('cart')
    }
  }

  // Calculate total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    syncCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
