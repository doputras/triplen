import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "3N - Luxury Sleepwear | Luxury made effortless",
  description: "Discover the finest luxury sleepwear collection. Premium robes, pajamas, nightgowns, and sets crafted with exceptional materials for your ultimate comfort.",
  keywords: ["luxury sleepwear", "silk robes", "cashmere pajamas", "premium nightgowns", "3N", "Triple N"],
  authors: [{ name: "3N" }],
  openGraph: {
    title: "3N - Luxury Sleepwear",
    description: "Luxury made effortless - Premium sleepwear for discerning tastes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-navy focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        <AuthProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="min-h-screen" role="main">
              {children}
            </main>
            <Footer />
            <CartSidebar />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
