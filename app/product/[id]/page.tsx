import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { ProductDetailClient } from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    notFound();
  }

  // Get related products (exclude current product)
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
