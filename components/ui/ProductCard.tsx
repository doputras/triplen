'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiEye } from 'react-icons/fi';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const displayPrice = product.price;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Get product images from database or use placeholders
  const getProductImage = (index: number) => {
    // Try database image URLs first
    if (index === 0 && product.image_url) {
      return product.image_url;
    }
    if (index === 1 && product.hover_image_url) {
      return product.hover_image_url;
    }
    
    // Fall back to legacy images array if available
    if (product.images && product.images[index]) {
      const imagePath = product.images[index];
      if (imagePath && imagePath.startsWith('http')) {
        return imagePath;
      }
    }
    
    // Use category-specific placeholder from Unsplash
    const placeholders: Record<string, string> = {
      robes: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      pajamas: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
      nightgowns: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      accessories: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    };
    return placeholders[product.category] || 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop';
  };

  const hasHoverImage = product.hover_image_url || (product.images && product.images.length > 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="block"
        >
          <div className="relative overflow-hidden bg-warm-white aspect-[3/4] mb-5">
            {/* Product Image */}
            <motion.div
              className="relative w-full h-full"
              onMouseEnter={() => {
                if (hasHoverImage) {
                  setCurrentImageIndex(1);
                }
              }}
              onMouseLeave={() => setCurrentImageIndex(0)}
            >
              <Image
                src={getProductImage(currentImageIndex)}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            </motion.div>

            {/* Badges - Better positioned */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {(product.isNew || product.created_at) && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-navy text-white px-4 py-2 text-xs uppercase tracking-wider font-medium shadow-md"
                >
                  New
                </motion.span>
              )}
              {hasDiscount && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-rose-gold text-white px-4 py-2 text-xs uppercase tracking-wider font-medium shadow-md"
                >
                  Sale
                </motion.span>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-wider font-medium shadow-md"
                >
                  Low Stock
                </motion.span>
              )}
            </div>

            {/* Quick Actions - Wishlist & Quick View */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
                  isWishlisted 
                    ? 'bg-rose-gold text-white' 
                    : 'bg-white/90 text-navy hover:bg-rose-gold hover:text-white'
                }`}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view functionality would go here
                }}
                className="p-3 bg-white/90 text-navy hover:bg-navy hover:text-white rounded-full shadow-lg backdrop-blur-sm transition-colors"
                aria-label="Quick view"
              >
                <FiEye size={18} />
              </motion.button>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-3 px-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg md:text-xl text-navy group-hover:text-accent-gold transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xl md:text-2xl font-semibold text-navy">
              ${displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="text-xs text-rose-gold font-medium">
                Save {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
              </span>
            )}
          </div>

          {/* Color Options Preview */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-2">
              <div className="flex gap-2">
                {product.colors.slice(0, 5).map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.3 }}
                    className="w-7 h-7 rounded-full border-2 border-gray-200 hover:border-accent-gold transition-colors cursor-pointer shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              {product.colors.length > 5 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{product.colors.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
