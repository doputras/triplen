import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schemas
const addToCartSchema = z.object({
  product_id: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  selected_color: z.string().optional(),
  selected_size: z.string().optional(),
})

const updateCartSchema = z.object({
  item_id: z.string().uuid('Invalid item ID'),
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
})

// Get user's cart
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating cart:', createError.message)
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 })
      }
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
      console.error('Error fetching cart items:', error.message)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    return NextResponse.json({ cart, items })
  } catch (error) {
    console.error('Unexpected error in GET /api/cart:', error)
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
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validationResult = addToCartSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      )
    }

    const { product_id, quantity, selected_color, selected_size } = validationResult.data

    // Verify product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, stock')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating cart:', createError.message)
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 })
      }
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
      const newQuantity = existingItem.quantity + quantity
      
      // Check stock availability
      if (newQuantity > product.stock) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        )
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating cart item:', error.message)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }

      return NextResponse.json(data)
    } else {
      // Check stock availability
      if (quantity > product.stock) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        )
      }

      // Insert new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id,
          quantity,
          selected_color: selected_color || '',
          selected_size: selected_size || '',
        })
        .select()
        .single()

      if (error) {
        console.error('Error adding to cart:', error.message)
        return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
      }

      return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Unexpected error in POST /api/cart:', error)
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
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validationResult = updateCartSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      )
    }

    const { item_id, quantity } = validationResult.data

    // Verify item belongs to user's cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const { data: cartItem } = await supabase
      .from('cart_items')
      .select('id, product_id')
      .eq('id', item_id)
      .eq('cart_id', cart.id)
      .single()

    if (!cartItem) {
      return NextResponse.json({ error: 'Item not found in your cart' }, { status: 404 })
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', item_id)

      if (error) {
        console.error('Error deleting cart item:', error.message)
        return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    // Check stock availability
    const { data: product } = await supabase
      .from('products')
      .select('stock')
      .eq('id', cartItem.product_id)
      .single()

    if (product && quantity > product.stock) {
      return NextResponse.json(
        { error: 'Not enough stock available' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', item_id)
      .select()
      .single()

    if (error) {
      console.error('Error updating cart item:', error.message)
      return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error in PATCH /api/cart:', error)
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
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const item_id = searchParams.get('item_id')

    if (!item_id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(item_id)) {
      return NextResponse.json({ error: 'Invalid item ID format' }, { status: 400 })
    }

    // Verify item belongs to user's cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    const { data: cartItem } = await supabase
      .from('cart_items')
      .select('id')
      .eq('id', item_id)
      .eq('cart_id', cart.id)
      .single()

    if (!cartItem) {
      return NextResponse.json({ error: 'Item not found in your cart' }, { status: 404 })
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', item_id)

    if (error) {
      console.error('Error deleting cart item:', error.message)
      return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/cart:', error)
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 }
    )
  }
}
