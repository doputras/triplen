'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useStore } from '@/store/useStore';
import { FiCheck, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiAward } from 'react-icons/fi';
import type { Product, ProductColor } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { setCartOpen } = useStore();

  // Get product image
  const getProductImage = () => {
    if (product.image_url) return product.image_url;
    
    const placeholders: Record<string, string> = {
      robes: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      pajamas: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop',
      nightgowns: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      accessories: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    };
    return placeholders[product.category] || 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1200&auto=format&fit=crop';
  };

  const currentImages = [
    getProductImage(),
    product.hover_image_url || getProductImage(),
    getProductImage()
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedColor, selectedSize, quantity);
    setCartOpen(true);
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-ivory min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-navy">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-navy capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-white overflow-hidden rounded-lg">
              <Image
                src={currentImages[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-white rounded overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-navy' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl text-navy mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color: {selectedColor.name}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-navy scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((sizeOption: any) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={!sizeOption.inStock}
                      className={`py-3 text-sm font-medium border rounded transition-colors ${
                        selectedSize === sizeOption.size
                          ? 'bg-navy text-white border-navy'
                          : sizeOption.inStock
                          ? 'bg-white text-gray-900 border-gray-300 hover:border-navy'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                {product.stock > 0 && product.stock <= 5 && (
                  <span className="text-sm text-red-600">Only {product.stock} left in stock</span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                fullWidth
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg" fullWidth>
                Add to Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <FiTruck className="text-navy mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiRefreshCw className="text-navy mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiAward className="text-navy mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Premium Quality</p>
                  <p className="text-sm text-gray-600">Crafted with the finest materials</p>
                </div>
              </div>
            </div>

            {/* Material */}
            {product.material && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Materials</h3>
                <p className="text-gray-700">{product.material}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-12 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
