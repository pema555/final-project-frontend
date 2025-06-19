import type { EventType } from '../types'
import EventCard from './EventCard'

interface EventListProps {
  events: EventType[]
  onEdit: (event: EventType) => void
  onDelete: (id: string) => void
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  const hasEvents = Array.isArray(events) && events.length > 0

  if (!hasEvents) {
    return (
      <div className='flex items-center justify-center p-8 text-center'>
        <div className='max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900'>
            No events found
          </h3>
          <p className='mt-2 text-sm text-gray-500'>
            Get started by creating your first event.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-16 mx-24'>
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default EventList
