import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { FiChevronRight, FiTruck, FiShield, FiRefreshCw, FiAward } from "react-icons/fi";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-warm-white">
      {/* Hero Section - Brand Identity */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/assets/home-bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-10 text-center text-white px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="mb-16 animate-fade-in">
            <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight mb-8 leading-none">
              3N
            </h1>
            <div className="h-px w-40 bg-accent-gold mx-auto mb-8"></div>
            <p className="text-xl md:text-3xl tracking-[0.3em] uppercase font-light">
              The Art of Sleep
            </p>
          </div>
          <p className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-16 font-light px-4">
            Crafted from the world's finest materials, each piece embodies timeless elegance and unparalleled comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/collection">
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy transition-all duration-300 px-12 py-4 min-w-[220px]"
              >
                Discover Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-accent-gold border-2 border-accent-gold text-navy hover:bg-transparent hover:text-white transition-all duration-300 px-12 py-4 min-w-[220px]"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 text-navy mb-3">
                  <FiTruck size={28} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy">Free Shipping</h3>
              <p className="text-sm text-gray-600 leading-relaxed">On all orders over $200</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 text-navy mb-3">
                  <FiRefreshCw size={28} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy">Easy Returns</h3>
              <p className="text-sm text-gray-600 leading-relaxed">30-day return policy</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 text-navy mb-3">
                  <FiShield size={28} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy">Secure Payment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">100% secure checkout</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 text-navy mb-3">
                  <FiAward size={28} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy">Premium Quality</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Finest materials crafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-7xl text-navy mb-6 tracking-tight">
              Essential Companions
            </h2>
            <div className="h-px w-32 bg-accent-gold mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of luxury sleepwear, each piece designed to elevate your evening ritual into an art form.
            </p>
          </div>

          {/* Horizontal Scrolling Products */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-10">
              <div className="flex gap-6 md:gap-8 justify-center md:justify-start">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-[340px] md:w-[400px] lg:w-[440px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* View All Link */}
            <div className="text-center mt-20">
              <Link 
                href="/collection" 
                className="inline-flex items-center gap-3 text-navy hover:text-accent-gold transition-colors text-lg md:text-xl font-medium group"
              >
                <span>View All Products</span>
                <FiChevronRight className="text-2xl group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - NEW */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] relative overflow-hidden bg-beige/20 rounded-lg shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop"
                  alt="Luxury sleepwear craftsmanship"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
              <div>
                <p className="text-accent-gold text-base uppercase tracking-widest mb-4">Our Story</p>
                <h2 className="font-serif text-5xl md:text-6xl text-navy mb-6 leading-tight">
                  Where Luxury Meets Comfort
                </h2>
                <div className="h-px w-24 bg-accent-gold mb-8 mx-auto lg:mx-0"></div>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
                <p>
                  At 3N, we believe that the art of rest begins with what you wear. Our collections 
                  are thoughtfully designed to transform your evening routine into a luxurious ritual.
                </p>
                <p>
                  Each piece is crafted from the world's finest materials—from Egyptian cotton to 
                  premium silk—ensuring unparalleled comfort and timeless elegance.
                </p>
                <p>
                  We're committed to sustainable luxury, working with ethical suppliers and using 
                  eco-friendly practices to create pieces that are as good for the planet as they 
                  are for you.
                </p>
              </div>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="mt-10">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
