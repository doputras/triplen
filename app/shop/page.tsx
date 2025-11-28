import { getAllProducts } from '@/lib/products';
import { ShopClient } from '@/components/shop/ShopClient';

export default async function ShopPage() {
  const products = await getAllProducts();

  return <ShopClient initialProducts={products} />;
}
