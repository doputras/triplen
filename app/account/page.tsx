'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

interface Order {
  id: string
  order_number: string
  status: string
  total: number
  created_at: string
  shipping_name: string
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) loadOrders()
  }, [user])

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50'
      case 'shipped':
        return 'text-blue-600 bg-blue-50'
      case 'processing':
        return 'text-yellow-600 bg-yellow-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-full px-6 md:px-8 lg:px-12 py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div>
          <h1 className="font-playfair text-4xl md:text-5xl text-navy mb-4">My Account</h1>
          <p className="text-gray-600">Manage your profile and view your order history</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-playfair text-navy mb-2">Profile Information</h2>
              <p className="text-gray-600">Your account details</p>
            </div>
            <Button variant="secondary" onClick={() => router.push('/account/edit')}>
              Edit Profile
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <p className="text-gray-900">
                {user.user_metadata?.full_name || 'Not provided'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
              <p className="text-gray-900">
                {formatDate(user.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-playfair text-navy mb-6">Order History</h2>

          {loadingOrders ? (
            <div className="text-center py-12 text-gray-600">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet</p>
              <Button onClick={() => router.push('/shop')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-navy transition-colors cursor-pointer"
                  onClick={() => router.push(`/orders/${order.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        Order #{order.order_number}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Ship to: {order.shipping_name}
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Button variant="secondary" onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </div>
  )
}
