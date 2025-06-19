import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import type { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '../lib/utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = authFormSchema()

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  label,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className='flex flex-col gap-1.5'>
          <FormLabel className='text-14 w-full max-w-[280px] font-medium text-gray-700'>
            {label}
          </FormLabel>
          <div className='flex w-full flex-col mt-2'>
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className='input-class'
                type={name === 'password' ? 'password' : 'text'}
              />
            </FormControl>
            {/* Show error message if there's an error */}
            {fieldState?.error && (
              <FormMessage className='text-12 text-red-500 mt-2'>
                {fieldState?.error.message}
              </FormMessage>
            )}
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput
