import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { authFormSchema, UserRole } from '../lib/utils'
import { Form, FormLabel } from '../components/ui/form'
import { Button } from '../components/ui/button'
import CustomInput from './CustomInput'
import { useAuthStore } from '../store/useAuthStore'

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  const navigate = useNavigate()
  const { registerUser, loading, loginUser, isAuthenticated } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === 'sign-up'
        ? {
            name: '',
            email: '',
            role: UserRole.USER,
            password: '',
          }
        : {
            email: '',
            password: '',
          },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      if (type === 'sign-up') {
        // Handle sign-up
        await registerUser({
          name: data!.name!,
          email: data.email,
          role: data.role || UserRole.USER,
          password: data.password,
        })
      }

      if (type === 'sign-in') {
        await loginUser({
          email: data.email,
          password: data.password,
        })
      }
    } catch (error) {
      console.error('Authentication error:', error)
      toast.error(
        error instanceof Error ? error.message : 'Authentication failed'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='flex min-h-screen w-full max-w-[480px] flex-col justify-center px-6 py-12'>
      <header className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-gray-900'>
          {type === 'sign-in' ? 'Welcome Back 👋' : 'Create an Account'}
        </h1>
        <p className='mt-2 text-sm text-gray-500'>
          {type === 'sign-in'
            ? 'Please enter your credentials to continue'
            : 'Fill in the details to get started'}
        </p>
      </header>

      {!loading ? (
        <Form {...form}>
          <form
            className='space-y-6 animate-fadeIn'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {type === 'sign-up' && (
              <CustomInput
                control={form.control}
                name='name'
                label='Name'
                placeholder='Enter your name'
              />
            )}

            <CustomInput
              control={form.control}
              name='email'
              label='Email'
              placeholder='Enter your email'
            />

            <CustomInput
              control={form.control}
              name='password'
              label='Password'
              placeholder='Enter your password'
            />

            {type === 'sign-up' && (
              <div className='flex flex-col gap-2'>
                <FormLabel className='text-sm font-medium text-gray-700'>
                  Role
                </FormLabel>
                <Controller
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full border-gray-300 focus:ring-2 focus:ring-blue-500'>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        <SelectGroup>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}

            <Button
              type='submit'
              disabled={isLoading || loading}
              className='w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60'
            >
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      ) : (
        <div className='flex justify-center'>
          <Loader2 className='animate-spin text-blue-600' size={32} />
        </div>
      )}

      <footer className='mt-8 text-center text-sm text-gray-600'>
        {type === 'sign-in' ? (
          <>
            Don't have an account?{' '}
            <Link
              to='/sign-up'
              className='font-medium text-blue-600 hover:underline'
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-blue-600 hover:underline'
            >
              Log in
            </Link>
          </>
        )}
      </footer>
    </section>
  )
}

export default AuthForm
