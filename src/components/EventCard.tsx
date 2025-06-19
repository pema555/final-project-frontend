import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import type{ EventType } from '../types'
import {
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
} from 'lucide-react'
import { cn } from '../lib/utils'

interface EventCardProps {
  event: EventType
  onEdit: (event: EventType) => void
  onDelete: (id: string) => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Format timestamp to readable time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Determine if event is upcoming, ongoing, or past
  const getEventStatus = () => {
    const today = new Date()
    const eventDate = new Date(event.date)

    // For demo purposes - assuming events last one day
    if (eventDate.toDateString() === today.toDateString()) {
      return { label: 'Today', color: 'bg-green-500' }
    } else if (eventDate > today) {
      return { label: 'Upcoming', color: 'bg-blue-500' }
    } else {
      return { label: 'Past', color: 'bg-gray-500' }
    }
  }

  const status = getEventStatus()

  return (
    <Card
      className={cn(
        'transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:stransform scale-[1.02] shadow'
      )}
    >
      <CardHeader className='space-y-1 pb-2 flex flex-col items-center'>
        <CardTitle className='text-xl font-bold '>{event.title}</CardTitle>
        <Badge className={`${status.color} text-white`}>{status.label}</Badge>
      </CardHeader>

      <CardContent className='space-y-4 flex-grow'>
        <div className='space-y-2'>
          <p className='text-sm font-medium text-gray-500'>Description</p>
          <p className='text-sm text-gray-700 line-clamp-3'>
            {event.description}
          </p>
        </div>

        <div className='space-y-3 pt-2'>
          <div className='flex items-center'>
            <CalendarIcon className='h-4 w-4 text-gray-400 mr-2 flex-shrink-0' />
            <p className='text-sm'>{formatDate(event.date)}</p>
          </div>

          <div className='flex items-center'>
            <MapPinIcon className='h-4 w-4 text-gray-400 mr-2 flex-shrink-0' />
            <p className='text-sm'>{event.location}</p>
          </div>

          <div className='flex items-center'>
            <ClockIcon className='h-4 w-4 text-gray-400 mr-2 flex-shrink-0' />
            <p className='text-xs text-gray-500'>
              Created: {formatTimestamp(event.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className='pt-2'>
        <div className='flex w-full space-x-2'>
          <Button
            variant='outline'
            onClick={() => onEdit(event)}
            className='flex-1 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
          >
            Edit
          </Button>
          <Button
            variant='outline'
            onClick={() => onDelete(event._id)}
            className='flex-1 bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700'
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default EventCard
