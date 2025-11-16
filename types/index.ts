export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'robes' | 'pajamas' | 'nightgowns' | 'sets' | 'accessories';
  material?: string;
  featured: boolean;
  image_url?: string;
  hover_image_url?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: number;
  created_at?: string;
  updated_at?: string;
  // Legacy fields for backward compatibility
  longDescription?: string;
  originalPrice?: number;
  images?: string[];
  materials?: string[];
  features?: string[];
  careInstructions?: string[];
  inStock?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  images?: string[];
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  measurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    length?: string;
  };
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize['size'];
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentInfo?: PaymentInfo;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface FilterOptions {
  category: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  inStockOnly: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}
