'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import type { Product } from '@/types';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';
type ViewMode = 'grid' | 'list';

interface ShopClientProps {
  initialProducts: Product[];
  initialCategory: string;
}

export function ShopClient({ initialProducts, initialCategory }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'robes', label: 'Robes' },
    { value: 'pajamas', label: 'Pajamas' },
    { value: 'nightgowns', label: 'Nightgowns' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Memoized filter and sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((s: any) => selectedSizes.includes(s.size))
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return sorted;
  }, [initialProducts, selectedCategory, sortBy, priceRange, selectedSizes]);

  // Memoized callbacks to prevent unnecessary re-renders
  const toggleSize = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSortBy('featured');
  }, []);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, Number(e.target.value)]);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const closeFilters = useCallback(() => {
    setShowFilters(false);
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-navy mb-6">
            {categories.find((c) => c.value === selectedCategory)?.label || 'Shop'}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {filteredAndSortedProducts.length} product
            {filteredAndSortedProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>
      <div className="h-1 sm:h-2 lg:h-3"></div> 
      <div className="max-w-full px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="font-serif text-xl font-semibold text-navy">Filters</h2>
                {(selectedCategory !== 'all' ||
                  priceRange[1] !== 500 ||
                  selectedSizes.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent-gold hover:text-gold transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`block w-full text-left px-4 py-3 rounded-md transition-all text-sm ${
                        selectedCategory === category.value
                          ? 'bg-navy text-white shadow-sm'
                          : 'text-gray-700 hover:bg-warm-white hover:text-navy'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full accent-accent-gold"
                    aria-label="Maximum price"
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2 text-sm border rounded-md transition-all font-medium ${
                        selectedSizes.includes(size)
                          ? 'border-navy bg-navy text-white shadow-sm'
                          : 'border-gray-300 text-gray-700 hover:border-accent-gold hover:text-accent-gold'
                      }`}
                      aria-label={`Filter by size ${size}`}
                      aria-pressed={selectedSizes.includes(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="lg:hidden flex items-center justify-between mb-6 gap-4">
              <button
                onClick={toggleFilters}
                className="flex items-center gap-2 px-5 py-3 border-2 border-gray-300 rounded-md hover:border-navy transition-all font-medium"
                aria-label="Toggle filters"
                aria-expanded={showFilters}
              >
                <FiFilter size={18} aria-hidden="true" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-5 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Desktop Sort & View Toggle */}
            <div className="hidden lg:flex items-center justify-between mb-10 bg-white p-4 rounded-lg shadow-sm">
              <div className="h-7 sm:h-9 lg:h-10"></div>
              <p className="text-sm text-gray-600 font-medium">
                Showing <span className="text-navy">{filteredAndSortedProducts.length}</span> of {initialProducts.length} products
              </p>
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md p-1">
                  <button
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-navy text-white' 
                        : 'text-gray-600 hover:text-navy'
                    }`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <FiGrid size={18} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleViewModeChange('list')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'list' 
                        ? 'bg-navy text-white' 
                        : 'text-gray-600 hover:text-navy'
                    }`}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <FiList size={18} aria-hidden="true" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="h-5 sm:h-6 lg:h-8"></div>            
            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <FiFilter size={32} className="text-gray-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-navy">No products found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={clearFilters} size="lg">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8' 
                  : 'space-y-6'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          <div className="w-1 sm:w-2 lg:w-3"></div> 
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeFilters}
            role="presentation"
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 md:p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="font-serif text-2xl font-semibold text-navy">Filters</h2>
                <button
                  onClick={closeFilters}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <FiX size={24} aria-hidden="true" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-md transition-all text-sm ${
                        selectedCategory === category.value
                          ? 'bg-navy text-white shadow-sm'
                          : 'text-gray-700 hover:bg-warm-white'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full accent-accent-gold"
                    aria-label="Maximum price"
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-navy mb-4 text-sm uppercase tracking-wider">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2 text-sm border rounded-md transition-all font-medium ${
                        selectedSizes.includes(size)
                          ? 'border-navy bg-navy text-white shadow-sm'
                          : 'border-gray-300 text-gray-700 hover:border-accent-gold'
                      }`}
                      aria-label={`Filter by size ${size}`}
                      aria-pressed={selectedSizes.includes(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-6">
                <Button onClick={clearFilters} fullWidth variant="outline" size="lg">
                  Clear All Filters
                </Button>
                <Button onClick={closeFilters} fullWidth size="lg">
                  View {filteredAndSortedProducts.length} Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
