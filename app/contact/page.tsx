'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiSend } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2400&auto=format&fit=crop"
            alt="Contact Us"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-6xl md:text-7xl font-bold mb-4">
            Get in Touch
          </h1>
          <div className="h-px w-24 bg-accent-gold mx-auto mb-4"></div>
          <p className="text-xl">We're here to help</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-4xl text-navy mb-8">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-12">
                Whether you have a question about our products, need styling advice, or want to
                learn more about 3N, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy text-lg mb-1">Email Us</h3>
                    <p className="text-gray-600">contact@3n-luxury.com</p>
                    <p className="text-gray-600">support@3n-luxury.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy text-lg mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon - Sat: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy text-lg mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Luxury Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                    <FiInstagram className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy text-lg mb-1">Follow Us</h3>
                    <p className="text-gray-600">@3N_Official</p>
                    <p className="text-sm text-gray-500 mt-1">Join our community for exclusive updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 shadow-sm">
              <h3 className="font-serif text-3xl text-navy mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="lg" fullWidth className="bg-navy hover:bg-accent-gold">
                  <FiSend className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-3xl text-navy mb-4">Stay Connected</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border border-gray-300 focus:outline-none focus:border-accent-gold"
              required
            />
            <Button type="submit" className="bg-navy hover:bg-accent-gold">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
