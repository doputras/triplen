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

        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight leading-none">
              3N
            </h1>
            <div className="h-2 sm:h-4 lg:h-6"></div>
            <div className="h-px w-24 sm:w-32 md:w-40 bg-accent-gold mx-auto mb-8 md:mb-10"></div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light">
              The Art of Sleep
            </p>
          </div>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-16 md:mb-20 font-light">
            Crafted from the world's finest materials, each piece embodies timeless elegance and unparalleled comfort.
          </p>
          <div className="h-2 sm:h-4 lg:h-6"></div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
            <Link href="/collection">
              <Button 
                size="lg" 
                className="bg-accent-gold border-2 border-accent-gold text-navy hover:bg-transparent hover:text-white transition-all duration-300 px-14 sm:px-16 py-6 sm:py-8 min-w-[200px] sm:min-w-[220px]">
                Discover Collection
              </Button>
            </Link>
          </div>
        </div>
        {/* END OF FIXES */}

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 lg:h-20"></div>

      {/* Trust Badges Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Spacer */}
          <div className="h-6 sm:h-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/5 text-navy">
                  <FiTruck size={28} />
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy">Free Shipping</h3>
              <div className="h-2"></div>
              <p className="text-sm text-gray-600 leading-relaxed px-2">On all orders over $200</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/5 text-navy">
                  <FiRefreshCw size={28} />
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy">Easy Returns</h3>
              <div className="h-2"></div>
              <p className="text-sm text-gray-600 leading-relaxed px-2">30-day return policy</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/5 text-navy">
                  <FiShield size={28} />
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy">Secure Payment</h3>
              <div className="h-2"></div>
              <p className="text-sm text-gray-600 leading-relaxed px-2">100% secure checkout</p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy/5 text-navy">
                  <FiAward size={28} />
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-navy">Premium Quality</h3>
              <div className="h-2"></div>
              <p className="text-sm text-gray-600 leading-relaxed px-2">Finest materials crafted</p>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="h-6 sm:h-8"></div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 lg:h-20"></div>

      {/* Products Carousel Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-ivory">
        <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy mb-6 sm:mb-8 tracking-tight">
              Essential Companions
            </h2>
            <div className="h-2 sm:h-4 lg:h-6"></div>
            <div className="h-px w-24 sm:w-32 bg-accent-gold mx-auto mb-8 sm:mb-10"></div>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mx-auto leading-relaxed px-4 max-w-full">
              Discover our curated selection of luxury sleepwear, each piece designed to elevate your evening ritual into an art form.
            </p>
          </div>
          <div className="h-2 sm:h-4 lg:h-6"></div>
          {/* Horizontal Scrolling Products */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-8 sm:pb-10">
              <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center md:justify-start">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[440px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-6 sm:h-8 lg:h-10"></div>

            {/* View All Link */}
            <div className="text-center mt-16 sm:mt-20">
              <Link 
                href="/collection" 
                className="inline-flex items-center gap-2 sm:gap-3 text-navy hover:text-accent-gold transition-colors text-base sm:text-lg md:text-xl font-medium group"
              >
                <span>View All Products</span>
                <FiChevronRight className="text-xl sm:text-2xl group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 lg:h-20"></div>

      {/* About Section - NEW */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center">
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
            <div className="order-1 lg:order-2 space-y-8 sm:space-y-10 text-center lg:text-left">
              <div>
                <p className="text-accent-gold text-sm sm:text-base uppercase tracking-widest mb-4 sm:mb-5">Our Story</p>
                <div className="h-2"></div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-navy mb-6 sm:mb-8 leading-tight">
                  Where Luxury Meets Comfort
                </h2>
                <div className="h-px w-20 sm:w-24 bg-accent-gold mb-8 sm:mb-10 mx-auto lg:mx-0"></div>
              </div>
              <div className="space-y-6 sm:space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
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
                <Button variant="outline" size="lg" className="mt-8 sm:mt-10">
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
