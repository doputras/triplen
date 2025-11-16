import { z } from 'zod';

// Shipping information validation schema
export const shippingSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Street address is required')
    .min(5, 'Please enter a complete street address')
    .max(100, 'Address must not exceed 100 characters'),
  apartment: z
    .string()
    .max(50, 'Apartment/Suite must not exceed 50 characters')
    .optional(),
  city: z
    .string()
    .min(1, 'City is required')
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'City can only contain letters, spaces, hyphens, and apostrophes'),
  state: z
    .string()
    .min(1, 'State is required')
    .min(2, 'Please enter a valid state')
    .max(50, 'State must not exceed 50 characters'),
  zipCode: z
    .string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
  country: z
    .string()
    .min(1, 'Country is required'),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

// Payment information validation schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .regex(/^\d{13,19}$/, 'Please enter a valid card number')
    .transform((val) => val.replace(/\s/g, '')),
  cardName: z
    .string()
    .min(1, 'Cardholder name is required')
    .min(3, 'Please enter the full name as it appears on the card')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY)')
    .refine((val) => {
      const [month, year] = val.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      
      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;
      return true;
    }, {
      message: 'Card has expired',
    }),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, 'Please enter a valid CVV (3 or 4 digits)'),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

// Complete checkout schema (combines shipping and payment)
export const checkoutSchema = z.object({
  shipping: shippingSchema,
  payment: paymentSchema,
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
