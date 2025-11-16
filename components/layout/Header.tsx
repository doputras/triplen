'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingBag, FiMenu, FiX, FiSearch, FiHeart, FiUser } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isMobileMenuOpen, setMobileMenuOpen, setCartOpen } = useStore();
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { href: '/', label: '3N' },
    { href: '/collection', label: 'Collection' },
    { href: '/contact', label: 'Contact' },
  ], []);

  const isActive = useCallback((href: string) => {
    // Exact match for homepage
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
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'border-b border-gray-200'
        }`} 
        role="banner"
      >
        <div className="mx-auto max-w-full px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <FiX size={24} aria-hidden="true" /> : <FiMenu size={24} aria-hidden="true" />}
            </button>

            {/* Logo */}
            <div className="w-1 sm:w-3 lg:w-5"></div> 
            <Link href="/" className="flex-shrink-0" aria-label="3N Luxury Sleepwear - Home">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy tracking-tight">
                3N
              </h1>
            </Link>

            <nav className="hidden md:flex flex-1 justify-center items-center gap-5 lg:gap-8" role="navigation" aria-label="Main navigation">
              <div className="w-4 sm:w-6 lg:w-8"></div> 
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

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-7 flex-shrink-0 gap-2 lg:gap-6" role="navigation" aria-label="Utility navigation">
              <button
                onClick={openSearch}
                className="p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
                aria-label="Search products"
              >
                <FiSearch size={25} aria-hidden="true" />
              </button>
              
              <button
                className="hidden md:block p-2 text-navy hover:text-accent-gold transition-colors focus-visible-ring rounded-md"
                aria-label="View wishlist"
              >
                <FiHeart size={25} aria-hidden="true" />
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
              <div className="w-1 sm:w-2 lg:w-3"></div> 
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
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

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
        >
          <div 
            className="bg-white w-full max-w-4xl mx-auto mt-20 p-8 md:p-12 shadow-2xl"
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
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-accent-gold focus:outline-none transition-colors text-navy"
                autoFocus
                aria-label="Search for products"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">Try searching for "robes", "silk", or "nightgown"</p>
          </div>
        </div>
      )}
    </>
  );
};