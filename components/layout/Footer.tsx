'use client';

import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiSend } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubmitMessage(''), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Brand and Newsletter Section */}
        <div className="max-w-4xl mx-auto text-center space-y-10 mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight">3N</h2>
            <p className="text-base md:text-lg text-gray-300 italic">Luxury made effortless</p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto px-4">
              Experience the finest luxury sleepwear, crafted with premium materials
              for your ultimate comfort and elegance.
            </p>
          </div>

          {/* Newsletter Form - Centered */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold">Join The 3N Experience</h3>
            <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto">
              Subscribe to receive exclusive updates, personalized recommendations, and be the first to discover our latest collections.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white text-navy placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-gold text-navy px-8 py-4 hover:bg-gold transition-colors font-medium uppercase tracking-wider whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? 'Subscribing...' : (
                    <>
                      <span>Subscribe</span>
                      <FiSend size={16} />
                    </>
                  )}
                </button>
              </div>
              {submitMessage && (
                <p className="text-accent-gold text-sm font-medium animate-fade-in">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 py-12 border-t border-gray-700">
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-accent-gold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collection?category=robes" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Robes
                </Link>
              </li>
              <li>
                <Link href="/collection?category=pajamas" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Pajamas
                </Link>
              </li>
              <li>
                <Link href="/collection?category=nightgowns" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Nightgowns
                </Link>
              </li>
              <li>
                <Link href="/collection?category=accessories" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-accent-gold mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-accent-gold mb-4">About 3N</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-accent-gold transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-accent-gold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-accent-gold hover:text-navy transition-all rounded-full"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-accent-gold hover:text-navy transition-all rounded-full"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-accent-gold hover:text-navy transition-all rounded-full"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm pt-4">
              Follow us @3N_Official for style inspiration and exclusive previews
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {currentYear} 3N Luxury Sleepwear. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-accent-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-accent-gold transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-accent-gold transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
