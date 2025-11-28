import { getAllProducts } from '@/lib/products';
import { ShopClient } from '@/components/shop/ShopClient';

export default async function CollectionPage() {
  const products = await getAllProducts();

  return <ShopClient initialProducts={products} />;
}
