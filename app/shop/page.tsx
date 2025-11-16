import { getAllProducts } from '@/lib/products';
import { ShopClient } from '@/components/shop/ShopClient';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams;
  const products = await getAllProducts();
  const initialCategory = params.category || 'all';

  return <ShopClient initialProducts={products} initialCategory={initialCategory} />;
}
