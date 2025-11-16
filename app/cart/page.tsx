'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-ivory min-h-screen py-24">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <FiShoppingBag size={80} className="text-gray-300 mx-auto" />
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              Your cart is empty
            </h1>
            <p className="text-gray-600 text-lg">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/shop">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 md:p-8 flex gap-6"
              >
                {/* Product Image */}
                <div className="relative w-32 h-40 bg-gray-100 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=400&auto=format&fit=crop"
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif text-xl text-navy hover:text-accent-gold transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        Color: {item.selectedColor.name} / Size: {item.selectedSize}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors h-fit"
                      aria-label="Remove item"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="px-6 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-medium text-navy">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 sticky top-24">
              <h2 className="font-serif text-2xl font-semibold text-navy mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 200 && (
                  <p className="text-sm text-accent-gold">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-semibold text-navy">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button fullWidth size="lg" className="mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button fullWidth size="lg" variant="outline">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="text-accent-gold">✓</span> Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-gold">✓</span> Free returns within 30 days
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-gold">✓</span> Customer support available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
