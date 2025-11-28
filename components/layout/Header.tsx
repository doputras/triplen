'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/types';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileMenuOpen, setMobileMenuOpen, setCartOpen } = useStore();
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search products with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.products || []);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const navLinks = useMemo(() => [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
    { href: '/contact', label: 'Contact' },
  ], []);

  const isActive = useCallback((href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    if (href === '/shop') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  }, [pathname]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, [setCartOpen]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const handleProductClick = useCallback((slug: string) => {
    closeSearch();
    router.push(`/product/${slug}`);
  }, [closeSearch, router]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'border-b border-gray-200'
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-full px-6 md:px-8 lg:px-12 grid grid-cols-3 items-center h-20 md:h-24">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <FiX size={24} aria-hidden="true" /> : <FiMenu size={24} aria-hidden="true" />}
            </button>

            <Link href="/" className="hidden md:block flex-shrink-0" aria-label="3N Luxury Sleepwear - Home">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight">
                3N
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex justify-center items-center gap-5 lg:gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wider transition-colors focus-visible-ring rounded-md px-4 py-2 ${
                  isActive(link.href)
                    ? 'text-accent-gold font-medium'
                    : 'text-navy hover:text-accent-gold'
                }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="md:hidden flex justify-center flex-shrink-0" aria-label="3N Luxury Sleepwear - Home">
            <h1 className="font-serif text-3xl font-bold text-navy tracking-tight">
              3N
            </h1>
          </Link>

          <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:space-x-7" role="navigation" aria-label="Utility navigation">
            <button
              onClick={openSearch}
              className="p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
              aria-label="Search products"
            >
              <FiSearch size={25} aria-hidden="true" />
            </button>

            <Link
              href={user ? '/account' : '/login'}
              className="p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
              aria-label={user ? 'My account' : 'Sign in to your account'}
            >
              <FiUser size={25} aria-hidden="true" />
            </Link>

            <button
              onClick={openCart}
              className="relative p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
              aria-label={cartCount > 0 ? `Shopping cart with ${cartCount} items` : 'Shopping cart (empty)'}
            >
              <FiShoppingBag size={25} aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  aria-hidden="true"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <nav className="container mx-auto px-6 md:px-8 py-8 space-y-2" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block py-3 px-4 text-sm uppercase tracking-wider transition-colors focus-visible-ring rounded-md ${
                    isActive(link.href)
                      ? 'text-accent-gold font-medium bg-accent-gold/5'
                      : 'text-navy hover:text-accent-gold hover:bg-warm-white'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
        >
          <div
            className="bg-white w-full max-w-4xl mx-auto mt-20 p-8 md:p-12 shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 id="search-title" className="font-serif text-2xl md:text-3xl text-navy">Search Products</h2>
              <button
                onClick={closeSearch}
                className="p-2 text-navy hover:text-accent-gold transition-colors"
                aria-label="Close search"
              >
                <FiX size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-accent-gold focus:outline-none transition-colors text-navy rounded-md"
                autoFocus
                aria-label="Search for products"
              />
            </div>

            {/* Search Results Dropdown */}
            {searchQuery.trim() && (
              <div className="mt-4 max-h-96 overflow-y-auto border border-gray-200 rounded-md bg-white">
                {isSearching ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="animate-spin inline-block w-6 h-6 border-2 border-navy border-t-transparent rounded-full mb-2"></div>
                    <p>Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleProductClick(product.slug)}
                          className="w-full flex items-center gap-4 p-4 hover:bg-warm-white transition-colors text-left"
                        >
                          <div className="relative w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image_url || 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=800&h=1067&auto=format&fit=crop'}
                              alt={product.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-navy truncate">{product.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                            <p className="text-sm font-semibold text-navy mt-1">${product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>No products found for "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try searching for "silk", "cotton", or "cashmere"</p>
                  </div>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <p className="text-sm text-gray-500 mt-4">Try searching for "silk pajamas", "cotton", or "cashmere"</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};