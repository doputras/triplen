# 3N E-Commerce - Quick Start Guide

Get your luxury sleepwear e-commerce site up and running in minutes!

## Prerequisites

- Node.js 18 or higher
- A Supabase account (free tier is fine)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

#### Option A: Using the Setup Script (Recommended for Windows)

```powershell
.\setup-supabase.ps1
```

The script will:
- Prompt you for your Supabase credentials
- Create your `.env.local` file automatically  
- Guide you through database setup

#### Option B: Manual Setup

1. Create a Supabase project at https://supabase.com

2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. In Supabase SQL Editor, run:
   - First: `supabase/schema.sql` (creates tables)
   - Then: `supabase/seed.sql` (adds products)

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 - your site is live! 🎉

## What's Included

- ✅ **8 Luxury Products** - Pre-seeded database
- ✅ **User Authentication** - Sign up, login, password reset
- ✅ **Shopping Cart** - Full cart functionality
- ✅ **Product Pages** - Dynamic product details
- ✅ **Responsive Design** - Works on all devices
- ✅ **Premium UI** - Luxury fonts and styling

## Default Test Features

You can start testing immediately:

1. **Browse Products**: Visit `/shop`
2. **View Details**: Click any product
3. **Add to Cart**: Select size/color and add
4. **Create Account**: Click user icon → Sign up
5. **Place Order**: Complete checkout flow

## File Structure

```
triplen/
├── app/                    # Next.js pages
│   ├── (auth pages)       # Login, signup, forgot password
│   ├── account/           # User profile & orders
│   ├── shop/              # Product catalog
│   ├── product/[id]/      # Product details
│   ├── cart/              # Shopping cart
│   └── checkout/          # Checkout flow
├── components/            # React components
├── lib/                   # Utilities & Supabase
├── supabase/             # Database files
└── .env.local            # Your credentials (created)
```

## Next Steps

### For Development

1. **Customize Products**: Edit products in Supabase dashboard
2. **Update Styling**: Modify `app/globals.css`
3. **Add Features**: See main README for planned features

### For Production

1. **Environment Variables**: Add to Vercel/hosting platform
2. **Domain Setup**: Configure in Supabase dashboard
3. **Email Templates**: Customize in Supabase Auth settings

## Common Issues

### "Database not found" error
- Make sure you ran `schema.sql` in Supabase SQL Editor
- Check your Supabase credentials in `.env.local`

### "No products showing"
- Run `seed.sql` to populate the database
- Verify products exist in Supabase Table Editor

### Authentication not working
- Add `http://localhost:3000` to allowed URLs in Supabase
- Add `http://localhost:3000/auth/callback` to redirect URLs

## Detailed Documentation

- **Full Setup Guide**: See `SUPABASE_SETUP.md`
- **Database Schema**: See `supabase/schema.sql`
- **Main README**: See `README.md`

## Support

Having issues? Check:
1. All environment variables are set correctly
2. Database tables are created (check Supabase dashboard)
3. Node.js version is 18 or higher
4. No other apps running on port 3000

## What's Next?

Your app has these features ready to implement:
- [ ] Payment integration (Stripe)
- [ ] Order tracking emails
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Admin dashboard

Happy coding! 🚀
