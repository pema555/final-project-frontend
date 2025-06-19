import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

/** Utility to merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

/** Enum for user roles */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/** Regex rules for password validation */
const passwordRegexes = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()]/,
}

/** Auth form validation schema */
export const authFormSchema = () =>
  z.object({
    name: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters')
      .refine((pwd) => passwordRegexes.uppercase.test(pwd), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((pwd) => passwordRegexes.lowercase.test(pwd), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((pwd) => passwordRegexes.number.test(pwd), {
        message: 'Password must contain at least one number',
      })
      .refine((pwd) => passwordRegexes.special.test(pwd), {
        message: 'Password must contain at least one special character',
      }),
  })

/** Event creation form schema */
export const EventSchema = () =>
  z.object({
    _id: z.string().optional(),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .refine((val) => new Date(val) >= new Date(new Date().toDateString()), {
        message: 'Date cannot be in the past',
      }),
    location: z.string().min(3, 'Location must be at least 3 characters'),
  })

/** Debounce utility */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout>

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as ((...args: Parameters<T>) => void) & { cancel: () => void }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}
