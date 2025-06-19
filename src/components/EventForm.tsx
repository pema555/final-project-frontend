import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { EventFormValues } from '../types'
import { EventSchema } from '../lib/utils'
import { useEffect } from 'react'

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void
  initialValues?: EventFormValues | null
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialValues }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(EventSchema()),
    defaultValues: {
      _id: '',
      title: '',
      description: '',
      date: '',
      location: '',
    },
  })

  // Reset form when initialValues change
  useEffect(() => {
    if (initialValues) {
      // Ensure date is in the correct format (YYYY-MM-DD)
      const formattedDate = initialValues.date
        ? new Date(initialValues.date).toISOString().split('T')[0]
        : ''

      reset({
        ...initialValues,
        date: formattedDate,
      })
    }
  }, [initialValues, reset])

  const handleFormSubmit = (data: EventFormValues) => {
    onSubmit({
      ...data,
      _id: initialValues?._id || data._id, // Preserve the ID when updating
    })
    reset()
  }

  return (
    <Card className='mb-16 lg:w-6/12 w-full '>
      <CardHeader>
        <CardTitle>{initialValues ? 'Update Event' : 'Create Event'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className='space-y-4'>
          {['title', 'description', 'date', 'location'].map((field) => (
            <div key={field}>
              <Controller
                name={field as keyof EventFormValues}
                control={control}
                render={({ field: inputField }) =>
                  field === 'description' ? (
                    <Textarea
                      {...inputField}
                      placeholder={`Enter ${field}`}
                      className={
                        errors[field as keyof EventFormValues]
                          ? 'border-red-500'
                          : ''
                      }
                    />
                  ) : (
                    <Input
                      {...inputField}
                      type={field === 'date' ? 'date' : 'text'}
                      placeholder={`Enter ${field}`}
                      className={
                        errors[field as keyof EventFormValues]
                          ? 'border-red-500'
                          : ''
                      }
                    />
                  )
                }
              />
              {errors[field as keyof EventFormValues] && (
                <p className='text-red-500 text-sm'>
                  {errors[field as keyof EventFormValues]?.message}
                </p>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            type='submit'
            className='text-16 rounded-lg border font-semibold text-white bg-blue-500 mt-6 w-full'
          >
            {initialValues ? 'Update Event' : 'Create Event'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default EventForm
