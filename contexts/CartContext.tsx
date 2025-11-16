'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Sync cart with database or localStorage
  const syncCart = useCallback(async () => {
    setLoading(true)
    try {
      if (user) {
        // Fetch cart from database
        const response = await fetch('/api/cart')
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.status}`)
        }

        const data = await response.json()
        
        // Validate data structure
        if (data && Array.isArray(data.items)) {
          const cartItems = data.items
            .filter((item: any) => item?.products) // Filter out invalid items
            .map((item: any) => {
              const selectedColor = item.products.colors?.find((c: any) => c.name === item.selected_color) || item.products.colors?.[0]
              if (!selectedColor) {
                console.warn('Invalid product color data for item:', item.id)
                return null
              }
              return {
                id: item.id,
                product: item.products,
                selectedColor,
                selected_size: item.selected_size,
                quantity: item.quantity,
              }
            })
            .filter((item: CartItem | null): item is CartItem => item !== null) // Remove null items
          
          setCart(cartItems)
        } else {
          console.warn('Invalid cart data structure, resetting cart')
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
            console.error('Error parsing localStorage cart, clearing:', parseError)
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
  }, [user])

  // Add item to cart
  const addToCart = useCallback(async (product: Product, color: ProductColor, size: string, quantity: number) => {
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

        if (!response.ok) {
          throw new Error(`Failed to add to cart: ${response.status}`)
        }

        await syncCart()
      } catch (error) {
        console.error('Error adding to cart:', error)
        throw error // Propagate error for UI handling
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
  }, [user, cart, syncCart])

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: string) => {
    if (user) {
      // Remove from database
      try {
        const response = await fetch(`/api/cart?item_id=${itemId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`Failed to remove from cart: ${response.status}`)
        }

        await syncCart()
      } catch (error) {
        console.error('Error removing from cart:', error)
        throw error
      }
    } else {
      // Remove from localStorage
      const newCart = cart.filter((item) => item.id !== itemId)
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }, [user, cart, syncCart])

  // Update item quantity
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
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

        if (!response.ok) {
          throw new Error(`Failed to update quantity: ${response.status}`)
        }

        await syncCart()
      } catch (error) {
        console.error('Error updating quantity:', error)
        throw error
      }
    } else {
      // Update in localStorage
      const newCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }, [user, cart, syncCart, removeFromCart])

  // Clear cart
  const clearCart = useCallback(async () => {
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
        throw error
      }
    } else {
      setCart([])
      localStorage.removeItem('cart')
    }
  }, [user, cart])

  // Calculate total
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }, [cart])

  // Get cart count
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }, [cart])

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
