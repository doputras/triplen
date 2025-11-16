# 3N (Triple N) - Luxury Sleepwear E-commerce

A high-performance, elegant e-commerce website for the luxury sleepwear brand **3N** (Triple N), embodying the motto "Luxury made effortless."

## 🌟 Features

### Current Features
- ✅ **Responsive Design**: Fully responsive across all devices
- ✅ **Product Catalog**: 8 curated luxury sleepwear products
- ✅ **Shopping Cart**: Full cart functionality with localStorage persistence
- ✅ **Product Details**: Dynamic product pages with variants (colors, sizes)
- ✅ **Checkout Flow**: Multi-step checkout process
- ✅ **Premium UI**: Luxury design with Playfair Display & Inter fonts
- ✅ **Category Browsing**: Shop by robes, pajamas, nightgowns, accessories

### In Development
- 🚧 **Supabase Backend**: PostgreSQL database for products, users, and orders
- 🚧 **User Authentication**: Secure signup/login with Supabase Auth
- 🚧 **Database-backed Cart**: Persistent cart across devices
- 🚧 **Order Management**: Complete order history and tracking
- 🚧 **Loading States**: Skeleton loaders and smooth transitions
- 🚧 **Animations**: Framer Motion micro-interactions
- 🚧 **Form Validation**: Zod + React Hook Form validation
- 🚧 **Accessibility**: WCAG 2.1 AA compliance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Supabase account (for backend features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd triplen
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions):
   - Create a Supabase project
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials

4. Run the database migrations:
   - Copy contents of `supabase/schema.sql` to Supabase SQL Editor
   - Copy contents of `supabase/seed.sql` to populate products

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
triplen/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── product/[id]/      # Dynamic product pages
│   ├── shop/              # Product catalog
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── cart/             # Cart-related components
│   ├── layout/           # Header, Footer
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and configurations
│   └── supabase/         # Supabase client setup
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
├── data/                  # Static data (products)
├── supabase/             # Database schema and seeds
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **Form Validation**: Zod + React Hook Form
- **Icons**: React Icons (Feather Icons)
- **Fonts**: Playfair Display, Inter

## 🎨 Design System

### Colors
- **Ivory**: `#fafaf9` - Primary background
- **Beige**: `#d6cfc4` - Secondary accent
- **Navy**: `#1e293b` - Text and accents
- **Gold**: `#d4af37` - Luxury highlights

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Never commit `.env.local` to version control!**

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete backend setup instructions
- [Quick Start Guide](./QUICKSTART.md) - Get started quickly
- [Setup Documentation](./SETUP.md) - Detailed setup information

## 🗄️ Database Schema

The application uses the following main tables:
- `profiles` - User profiles (extends Supabase auth.users)
- `products` - Product catalog
- `carts` - Shopping carts (user or session-based)
- `cart_items` - Individual cart items
- `orders` - Order history
- `order_items` - Order line items

See `supabase/schema.sql` for the complete schema with RLS policies.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own carts and orders
- Authentication handled by Supabase Auth
- API keys properly scoped (anon key for client)
- Middleware protection for authenticated routes

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to:
- Set environment variables
- Update Supabase URL configuration
- Configure custom domain in Supabase

## 📈 Performance

- Server-side rendering for optimal SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Optimized fonts with next/font
- Minimal bundle size

## 🤝 Contributing

This is a private commercial project. If you have suggestions or find bugs, please contact the development team.

## 📄 License

Proprietary - All rights reserved by 3N (Triple N)

## 🆘 Support

For technical issues:
1. Check the documentation in `/docs`
2. Review the setup guides
3. Check browser console for errors
4. Verify environment variables

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

---

Built with ❤️ for luxury sleepwear enthusiasts
