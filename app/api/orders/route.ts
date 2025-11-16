import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Create a new order
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      cart_items,
      shipping_info,
      subtotal,
      shipping,
      tax,
      total,
    } = body

    // Validate required fields
    if (!cart_items || cart_items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!shipping_info) {
      return NextResponse.json({ error: 'Shipping information is required' }, { status: 400 })
    }

    // Generate order number
    const orderNumber = `3N-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: 'pending',
        subtotal: parseFloat(subtotal),
        shipping: parseFloat(shipping),
        tax: parseFloat(tax),
        total: parseFloat(total),
        shipping_name: shipping_info.fullName || `${shipping_info.firstName} ${shipping_info.lastName}`,
        shipping_email: shipping_info.email,
        shipping_address: shipping_info.apartment 
          ? `${shipping_info.address}, ${shipping_info.apartment}`
          : shipping_info.address,
        shipping_city: shipping_info.city,
        shipping_state: shipping_info.state,
        shipping_zip: shipping_info.zipCode,
        shipping_country: shipping_info.country || 'United States',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }

    // Create order items
    const orderItems = cart_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products.name,
      product_price: parseFloat(item.products.price),
      quantity: parseInt(item.quantity),
      selected_color: item.selected_color,
      selected_size: item.selected_size,
      subtotal: parseFloat(item.products.price) * parseInt(item.quantity),
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    // Clear the cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (cart) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id)
    }

    return NextResponse.json({ order, orderNumber })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Get user's orders
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
