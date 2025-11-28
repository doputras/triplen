import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ products: [] });
    }

    const searchTerm = query.trim().toLowerCase();
    const supabase = await createClient();

    // Search products by name, description, or material
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,material.ilike.%${searchTerm}%`)
      .limit(10);

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Failed to search products' },
        { status: 500 }
      );
    }

    // Transform database products to match Product type
    const transformedProducts = (products || []).map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      image_url: product.image_url,
      hover_image_url: product.hover_image_url,
      images: product.images || [],
      colors: product.colors || [],
      sizes: product.sizes || [],
      material: product.material,
      stock: product.stock,
      isNew: product.is_new,
      isFeatured: product.is_featured,
      created_at: product.created_at,
    }));

    return NextResponse.json({ products: transformedProducts });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
