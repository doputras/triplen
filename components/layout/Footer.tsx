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
      <div className="h-1 sm:h-3 lg:h-5"></div> 
      <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* Brand and Newsletter Section */}
        <div className="max-w-full mx-auto text-center space-y-8 sm:space-y-10 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-5">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">3N</h2>
            <p className="text-base md:text-lg text-accent-gold italic">Luxury made effortless</p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mx-auto px-4">
              Experience the finest luxury sleepwear, crafted with premium materials
              for your ultimate comfort and elegance.
            </p>
          </div>
        </div>
        <div className="flex justify-center py-10 sm:py-12 border-t border-gray-700">
          <div className="space-y-4 text-center">
            <div className="h-1 sm:h-3 lg:h-5"></div> 
            <div className="flex gap-3 sm:gap-4 justify-center">
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
            <div className="h-1 sm:h-3 lg:h-5"></div> 
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-sm px-4 sm:px-0">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} 3N Luxury Sleepwear. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
