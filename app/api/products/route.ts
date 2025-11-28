import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const isNew = searchParams.get('new')

    const supabase = await createClient()
    let query = supabase.from('products').select('*')

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (isNew === 'true') {
      query = query.eq('is_new', true)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Database error fetching products:', error.message)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
