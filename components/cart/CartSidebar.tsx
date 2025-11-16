'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, setCartOpen } = useStore();
  const { cart, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 shadow-2xl flex flex-col"
          >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy">Shopping Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <FiShoppingBag size={64} className="text-gray-300" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <Button onClick={() => setCartOpen(false)}>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-0"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                    <Image
                      src={`https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=400&auto=format&fit=crop`}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-navy">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.selectedColor.name} / {item.selectedSize}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiX size={18} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-medium text-navy">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 md:p-8 space-y-6">
            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal < 200 && (
                <p className="text-sm text-accent-gold bg-warm-white px-4 py-2 rounded">
                  Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="flex justify-between text-xl font-semibold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={() => setCartOpen(false)}>
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            </Link>

            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className="block text-center text-base text-navy hover:text-accent-gold transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </motion.div>
      </>
      )}
    </AnimatePresence>
  );
};
