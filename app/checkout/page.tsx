'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { FormInput, FormSelect } from '@/components/ui/FormInput';
import { useCart } from '@/contexts/CartContext';
import { FiCheck, FiLock } from 'react-icons/fi';
import { 
  shippingSchema, 
  paymentSchema, 
  type ShippingFormData, 
  type PaymentFormData 
} from '@/lib/validations/checkout';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && cart.length === 0) {
      router.push('/cart');
    }
  }, [cart.length, router, isClient]);

  const shippingForm = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: 'onBlur',
    defaultValues: {
      country: 'United States',
    },
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    if (!shippingData || !paymentData) {
      alert('Missing shipping or payment information');
      return;
    }

    try {
      // Create order in Supabase
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_items: cart.map(item => ({
            product_id: item.product.id,
            products: {
              name: item.product.name,
              price: item.product.price,
            },
            quantity: item.quantity,
            selected_color: item.selectedColor.name,
            selected_size: item.selectedSize,
          })),
          shipping_info: {
            fullName: `${shippingData.firstName} ${shippingData.lastName}`,
            email: shippingData.email,
            phone: shippingData.phone,
            address: shippingData.address,
            apartment: shippingData.apartment,
            city: shippingData.city,
            state: shippingData.state,
            zipCode: shippingData.zipCode,
            country: shippingData.country,
          },
          subtotal,
          shipping,
          tax,
          total,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create order');
      }

      const { order, orderNumber } = await response.json();
      
      // Clear cart after successful order
      await clearCart();
      
      // Show success message with order number
      alert(`Order placed successfully! Order #${orderNumber}`);
      
      // Redirect to account page
      router.push('/account');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isClient || cart.length === 0) {
    return null;
  }

  const steps = [
    { id: 'shipping', label: 'Shipping', completed: currentStep !== 'shipping' },
    { id: 'payment', label: 'Payment', completed: currentStep === 'review' },
    { id: 'review', label: 'Review', completed: false },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <h1 className="font-serif text-3xl font-semibold text-navy">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-accent-gold text-white'
                        : currentStep === step.id
                        ? 'bg-navy text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.completed ? <FiCheck /> : index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep === step.id ? 'text-navy' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-navy mb-5">
                  Shipping Information
                </h2>
                <form onSubmit={shippingForm.handleSubmit(handleShippingSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...shippingForm.register('firstName')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {shippingForm.formState.errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...shippingForm.register('lastName')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {shippingForm.formState.errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...shippingForm.register('email')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {shippingForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      {...shippingForm.register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {shippingForm.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      {...shippingForm.register('address')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {shippingForm.formState.errors.address && (
                      <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      {...shippingForm.register('apartment')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {shippingForm.formState.errors.apartment && (
                      <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.apartment.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        {...shippingForm.register('city')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {shippingForm.formState.errors.city && (
                        <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        {...shippingForm.register('state')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {shippingForm.formState.errors.state && (
                        <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.state.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        {...shippingForm.register('zipCode')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {shippingForm.formState.errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      {...shippingForm.register('country')}
                      defaultValue="United States"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {shippingForm.formState.errors.country && (
                      <p className="mt-1 text-sm text-red-600">{shippingForm.formState.errors.country.message}</p>
                    )}
                  </div>

                  <Button type="submit" size="lg" fullWidth>
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-navy mb-5 flex items-center gap-2">
                  <FiLock className="text-accent-gold" />
                  Payment Information
                </h2>
                <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234567890123456"
                      {...paymentForm.register('cardNumber')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {paymentForm.formState.errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{paymentForm.formState.errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      {...paymentForm.register('cardName')}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    {paymentForm.formState.errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{paymentForm.formState.errors.cardName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        {...paymentForm.register('expiryDate')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {paymentForm.formState.errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{paymentForm.formState.errors.expiryDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        {...paymentForm.register('cvv')}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      />
                      {paymentForm.formState.errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{paymentForm.formState.errors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={() => setCurrentStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" fullWidth>
                      Continue to Review
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Review Order */}
            {currentStep === 'review' && (
              <div className="bg-white p-6 space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-navy mb-5">
                    Review Your Order
                  </h2>

                  {/* Shipping Address */}
                  <div className="mb-5 pb-5 border-b border-gray-200">
                    <h3 className="font-medium text-navy mb-3">Shipping Address</h3>
                    {shippingData && (
                      <>
                        <p className="text-gray-700">
                          {shippingData.firstName} {shippingData.lastName}
                        </p>
                        <p className="text-gray-700">{shippingData.address}</p>
                        {shippingData.apartment && (
                          <p className="text-gray-700">{shippingData.apartment}</p>
                        )}
                        <p className="text-gray-700">
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                        </p>
                        <p className="text-gray-700">{shippingData.email}</p>
                        <p className="text-gray-700">{shippingData.phone}</p>
                      </>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="mb-5">
                    <h3 className="font-medium text-navy mb-2">Payment Method</h3>
                    {paymentData && (
                      <p className="text-gray-700">
                        Card ending in {paymentData.cardNumber.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => setCurrentStep('payment')}
                  >
                    Back
                  </Button>
                  <Button size="lg" fullWidth onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-navy mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                      <Image
                        src={
                          item.selectedColor.images?.[0] || 
                          item.product.images?.[0] || 
                          item.product.image_url ||
                          'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=400&auto=format&fit=crop'
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-navy text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.selectedColor.name} / {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-medium text-navy mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-navy">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
