# Supabase Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (sign up at https://supabase.com)

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - **Name**: triplen-ecommerce (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Select the region closest to your users
4. Click "Create new project" and wait for it to be provisioned (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need two keys:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")
3. Copy these values - you'll need them in the next step

## Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control! It's already in `.gitignore`.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. Wait for the query to complete - you should see "Success. No rows returned"

This will create:
- All necessary tables (profiles, products, carts, cart_items, orders, order_items)
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic profile creation and timestamp updates

## Step 5: Seed the Database with Products

1. Still in the **SQL Editor**, create another new query
2. Copy the entire contents of `supabase/seed.sql`
3. Paste it into the SQL editor
4. Click **Run**
5. You should see "Success. 8 rows returned" (or similar)

This will populate your database with the 8 luxury sleepwear products.

## Step 6: Verify the Setup

### Check Tables
1. Go to **Table Editor** in the Supabase dashboard
2. You should see these tables:
   - profiles
   - products
   - carts
   - cart_items
   - orders
   - order_items

### Check Products
1. Click on the **products** table
2. You should see 8 products listed
3. Verify the data looks correct

### Check Authentication
1. Go to **Authentication** → **Policies**
2. Verify that Row Level Security is enabled for all tables
3. Each table should have appropriate policies listed

## Step 7: Configure Authentication (Optional but Recommended)

### Email Settings
1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Magic link
   - Change email
   - Reset password

### URL Configuration
1. Go to **Authentication** → **URL Configuration**
2. Add your site URL:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### Providers (Optional)
1. Go to **Authentication** → **Providers**
2. Enable any OAuth providers you want (Google, GitHub, etc.)
3. Configure the credentials for each provider

## Step 8: Test the Connection

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. The app should now be connected to Supabase!

## Troubleshooting

### "Invalid API key" Error
- Double-check your `.env.local` file
- Make sure you're using the **anon/public** key, not the service_role key
- Restart your dev server after changing environment variables

### Tables Not Created
- Make sure you ran the entire `schema.sql` file
- Check the SQL Editor for any error messages
- Verify your database password is correct

### Products Not Showing
- Run the `seed.sql` file
- Check the products table in the Table Editor
- Verify RLS policies are enabled

### Authentication Not Working
- Check your URL configuration in Supabase
- Verify redirect URLs are correct
- Check browser console for errors

## Next Steps

Now that Supabase is set up, you can:

1. **Test Authentication**: Try signing up for an account
2. **Browse Products**: Products should now load from the database
3. **Add to Cart**: Cart data will be stored in Supabase
4. **Place Orders**: Orders will be saved to the database

## Database Backup

It's recommended to set up automatic backups:

1. Go to **Settings** → **Database**
2. Under "Backups", enable automatic backups
3. Free tier includes daily backups with 7-day retention

## Useful SQL Queries

### View all products
```sql
SELECT * FROM products ORDER BY created_at DESC;
```

### View all users
```sql
SELECT * FROM profiles;
```

### View cart items with product details
```sql
SELECT ci.*, p.name, p.price 
FROM cart_items ci
JOIN products p ON ci.product_id = p.id;
```

### View orders with items
```sql
SELECT o.*, oi.product_name, oi.quantity, oi.subtotal
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
ORDER BY o.created_at DESC;
```

## Security Notes

- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Users can only access their own carts and orders
- ✅ Anonymous users can browse products
- ✅ Product management requires authentication
- ⚠️ Never expose your `service_role_key` in client-side code
- ⚠️ Always validate user input on the server

## Production Checklist

Before deploying to production:

- [ ] Update `.env.local` with production Supabase credentials
- [ ] Set up custom domain in Supabase
- [ ] Configure email templates with your branding
- [ ] Enable and configure OAuth providers
- [ ] Set up database backups
- [ ] Review and test all RLS policies
- [ ] Add monitoring and error tracking
- [ ] Test authentication flows thoroughly
- [ ] Verify all API endpoints work correctly

## Support

For issues with Supabase:
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions
- Discord: https://discord.supabase.com

For issues with this project:
- Check the main README.md
- Review error logs in the browser console
- Verify environment variables are correct
