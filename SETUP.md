# 3N (Triple N) - Luxury Sleepwear E-Commerce Website

**Motto:** *Luxury made effortless*

A high-performance, elegant e-commerce website for the luxury sleepwear brand "3N", built with Next.js 15, TypeScript, Tailwind CSS, and Zustand for state management.

## 🌟 Features

### Design & User Experience
- **Luxury Aesthetic**: Modern, minimalist design with generous white space
- **Refined Color Palette**: Ivory, beige, navy with metallic gold accents
- **Premium Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices
- **Image-Forward Design**: Beautiful product photography and lifestyle imagery

### E-Commerce Functionality
- ✅ **Homepage**: Hero section, featured categories, product showcase, brand story
- ✅ **Product Gallery**: Advanced filtering by category, price, size
- ✅ **Product Details**: Variant selectors (color/size), image gallery, detailed descriptions
- ✅ **Shopping Cart**: Real-time updates, quantity management, sliding cart sidebar
- ✅ **Checkout Flow**: Multi-step checkout (shipping, payment, review)
- ✅ **State Management**: Persistent cart using Zustand with localStorage
- ✅ **SEO Optimized**: Next.js App Router with proper metadata

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand with persistence
- **Icons**: React Icons (Feather Icons)
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Inter, Playfair Display)

## 📁 Project Structure

```
triplen/
├── app/
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Multi-step checkout flow
│   ├── product/[id]/      # Dynamic product detail pages
│   ├── shop/              # Product gallery with filters
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & theme
├── components/
│   ├── cart/
│   │   └── CartSidebar.tsx    # Sliding cart sidebar
│   ├── layout/
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Site footer
│   └── ui/
│       ├── Button.tsx         # Reusable button component
│       └── ProductCard.tsx    # Product card component
├── data/
│   └── products.ts        # Product catalog data
├── store/
│   └── useStore.ts        # Zustand global state
├── types/
│   └── index.ts           # TypeScript type definitions
└── public/                # Static assets & images
```

## 🎨 Design System

### Color Palette
- **Ivory**: `#fafaf9` - Primary background
- **Beige**: `#d6cfc4` - Accent color
- **Navy**: `#1e293b` - Primary text and CTA
- **Gold**: `#d4af37` - Luxury accent
- **Accent Gold**: `#c9a961` - Hover states
- **Warm White**: `#f8f7f4` - Secondary background
- **Charcoal**: `#2d2d2d` - Dark elements

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body Text**: Inter (sans-serif, clean and modern)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd triplen
   ```

2. **Dependencies are already installed**. If you need to reinstall:
   ```bash
   npm install
   ```

### Adding Product Images

The website references product images that need to be added to the `public` directory:

**Required Images:**
- `public/hero-image.jpg` - Homepage hero background
- `public/about-image.jpg` - Brand story section
- `public/categories/robes.jpg` - Robes category image
- `public/categories/pajamas.jpg` - Pajamas category image
- `public/categories/nightgowns.jpg` - Nightgowns category image
- `public/products/` - Individual product images (see `data/products.ts` for filenames)

**Placeholder Images:**
You can use stock images from:
- [Unsplash](https://unsplash.com) - Search for "luxury sleepwear", "silk robe", etc.
- [Pexels](https://pexels.com) - Free high-quality images

Or create placeholder images using:
- [Placeholder.com](https://placeholder.com)
- Example: `https://via.placeholder.com/800x1200/fafaf9/1e293b?text=Product+Image`

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, featured products |
| `/shop` | Product gallery with filtering and sorting |
| `/shop?category=robes` | Filtered by category |
| `/product/[slug]` | Individual product detail page |
| `/cart` | Full shopping cart page |
| `/checkout` | Multi-step checkout process |

## 🛒 E-Commerce Features

### Shopping Cart
- Persistent cart storage (localStorage)
- Real-time quantity updates
- Variant tracking (color + size)
- Sliding sidebar for quick access
- Free shipping threshold ($200)

### Product Filtering
- Category filtering
- Price range slider
- Size selection
- Sort by: Featured, Newest, Price (Low to High, High to Low)

### Checkout Process
1. **Shipping Information**: Customer details and delivery address
2. **Payment Information**: Secure payment details (demo mode)
3. **Order Review**: Final confirmation before placing order

## 🎯 Product Categories

- **Robes**: Luxury loungewear robes
- **Pajamas**: Classic pajama sets
- **Nightgowns**: Elegant nightwear
- **Sets**: Coordinated sleepwear sets
- **Accessories**: Sleep masks, scrunchies, etc.

## 🔐 State Management

The application uses Zustand for state management with the following features:
- Cart management (add, remove, update quantities)
- UI state (mobile menu, cart sidebar)
- Persistent storage using localStorage
- Type-safe with TypeScript

## 📦 Sample Products

The site includes 8 sample luxury sleepwear products:
1. Silk Kimono Robe - $298
2. Cotton Pajama Set - $148
3. Satin Slip Nightgown - $128
4. Cashmere Sleep Set - $398
5. Linen Lounge Robe - $168
6. Velvet Pajama Set - $218
7. Modal Sleep Shirt - $88
8. Silk Eye Mask & Scrunchie Set - $48

## 🎨 Customization

### Adding New Products
Edit `data/products.ts` to add new products:

```typescript
{
  id: '9',
  name: 'Your Product Name',
  slug: 'your-product-slug',
  description: 'Short description',
  longDescription: 'Detailed description',
  price: 199,
  category: 'robes',
  images: ['/products/your-image.jpg'],
  colors: [...],
  sizes: [...],
  // ... other properties
}
```

### Changing Colors
Edit `app/globals.css` to modify the color palette:

```css
:root {
  --ivory: #fafaf9;
  --beige: #d6cfc4;
  --navy: #1e293b;
  /* Add your colors */
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📝 Notes

- This is a **demo e-commerce site** - payment processing is simulated
- Images are referenced but not included - add your own product photography
- For production use, integrate with:
  - Stripe/PayPal for payments
  - Contentful/Sanity for CMS
  - Firebase/Supabase for backend
  - Cloudinary for image optimization

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your own luxury brand.

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for luxury sleepwear enthusiasts**

*Luxury made effortless - 3N*
