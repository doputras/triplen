'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { signupSchema, type SignupFormData } from '@/lib/validations/auth'

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: SignupFormData) => {
    setError(null)
    setLoading(true)

    const fullName = `${data.firstName} ${data.lastName}`
    const { error } = await signUp(data.email, data.password, fullName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl text-navy mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-8">
              We&apos;ve sent you a confirmation email. Please click the link in the email to verify your account.
            </p>
            <Button onClick={() => router.push('/login')}>
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-24 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-navy mb-4">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join 3N to enjoy exclusive benefits and a personalized shopping experience
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
              id="firstName"
              label="First Name"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              required
              registration={register('firstName')}
              error={errors.firstName?.message}
            />

            <FormInput
              id="lastName"
              label="Last Name"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              required
              registration={register('lastName')}
              error={errors.lastName?.message}
            />

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
              autoComplete="new-password"
              placeholder="••••••••"
              required
              registration={register('password')}
              error={errors.password?.message}
            />

            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              registration={register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-navy hover:text-navy/80 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
