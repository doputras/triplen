'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setLoading(true)

    const { error } = await signIn(data.email, data.password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/account')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-24 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-navy mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue shopping
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
          {error && (
            <div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              registration={register('email')}
              error={errors.email?.message}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              registration={register('password')}
              error={errors.password?.message}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-navy hover:text-navy/80 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/signup"
              className="font-medium text-navy hover:text-navy/80 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
