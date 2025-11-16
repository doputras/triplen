import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Get user's cart
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      const { data: newCart } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single()
      cart = newCart
    }

    // Get cart items with product details
    const { data: items, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('cart_id', cart.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cart, items })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// Add item to cart
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { product_id, quantity, selected_color, selected_size } = body

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      const { data: newCart } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single()
      cart = newCart
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', product_id)
      .eq('selected_color', selected_color || '')
      .eq('selected_size', selected_size || '')
      .single()

    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data)
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id,
          quantity,
          selected_color,
          selected_size,
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(data)
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// Update cart item quantity
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { item_id, quantity } = body

    if (quantity <= 0) {
      // Remove item if quantity is 0
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', item_id)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', item_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

// Delete cart item
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const item_id = searchParams.get('item_id')

    if (!item_id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', item_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 }
    )
  }
}
