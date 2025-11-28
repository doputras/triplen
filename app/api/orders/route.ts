import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schemas
const shippingInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  fullName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required').max(500),
  apartment: z.string().max(100).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  zipCode: z.string().min(1, 'ZIP code is required').max(20),
  country: z.string().max(100).optional(),
})

const createOrderSchema = z.object({
  cart_items: z.array(z.object({
    product_id: z.string().uuid(),
    products: z.object({
      name: z.string(),
      price: z.union([z.string(), z.number()]),
    }),
    quantity: z.union([z.string(), z.number()]),
    selected_color: z.string().optional(),
    selected_size: z.string().optional(),
  })).min(1, 'Cart cannot be empty'),
  shipping_info: shippingInfoSchema,
  subtotal: z.union([z.string(), z.number()]),
  shipping: z.union([z.string(), z.number()]),
  tax: z.union([z.string(), z.number()]),
  total: z.union([z.string(), z.number()]),
})

// Create a new order
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate input
    const validationResult = createOrderSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      )
    }

    const {
      cart_items,
      shipping_info,
      subtotal,
      shipping,
      tax,
      total,
    } = validationResult.data

    // Generate secure order number
    const timestamp = Date.now().toString(36)
    const randomPart = crypto.randomUUID().split('-')[0]
    const orderNumber = `3N-${timestamp}-${randomPart}`.toUpperCase()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: 'pending',
        subtotal: parseFloat(String(subtotal)),
        shipping: parseFloat(String(shipping)),
        tax: parseFloat(String(tax)),
        total: parseFloat(String(total)),
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
      console.error('Order creation error:', orderError.message)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create order items
    const orderItems = cart_items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products.name,
      product_price: parseFloat(String(item.products.price)),
      quantity: parseInt(String(item.quantity)),
      selected_color: item.selected_color || null,
      selected_size: item.selected_size || null,
      subtotal: parseFloat(String(item.products.price)) * parseInt(String(item.quantity)),
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError.message)
      // Rollback order creation
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
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
    console.error('Unexpected error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Get user's orders
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
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
      console.error('Error fetching orders:', error.message)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Unexpected error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
