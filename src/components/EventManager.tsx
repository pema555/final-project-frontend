import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import EventForm from './EventForm'
import EventList from './EventList'
import { EventPagination } from './EventPagination'

import type { EventFormValues, GetEventsParams } from '../types'
import { useEventStore } from '../store/useEventStore'
import Header from './Header'
import EventfilterBar from '../components/EventfilterBar'
import { debounce } from '../lib/utils'
import { Loader2 } from 'lucide-react'

const EventManager = () => {
  const {
    events,
    meta,
    loading,
    fetchEvents,
    deleteEvent,
    addEvent,
    updateEvent,
  } = useEventStore()

  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(null)

  // Basic search/filter/pagination state
  const [searchParams, setSearchParams] = useState<GetEventsParams>({
    page: '1',
    limit: '6',
  })

  // Fetch events when searchParams change
  useEffect(() => {
    fetchEvents(searchParams)
  }, [searchParams, fetchEvents])

  // Handle form submission (add or update)
  const handleCreateOrUpdate = async (data: EventFormValues) => {
    try {
      const formattedDate = new Date(data.date).toISOString().split('T')[0]

      if (data._id) {
        const { _id, ...rest } = data
        await updateEvent(_id, { ...rest, date: formattedDate })
      } else {
        await addEvent({ ...data, date: formattedDate })
      }

      setEditingEvent(null)
    } catch (error) {
      console.error('Failed to save event', error)
      toast.error('Failed to save event. Please try again.')
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return

    try {
      await deleteEvent(id)

      // If last item on page is deleted, go back a page
      if (events.length === 1 && meta && meta.page > 1) {
        setSearchParams((prev) => ({
          ...prev,
          page: (meta.page - 1).toString(),
        }))
      }
    } catch (error) {
      console.error('Failed to delete event', error)
      toast.error('Failed to delete event. Please try again.')
    }
  }

 const debouncedSearch = useMemo(() => {
  return debounce((...args: unknown[]) => {
    const params = args[0] as Partial<GetEventsParams>
    setSearchParams((prev) => ({
      ...prev,
      ...params,
      page: '1',
    }))
  }, 500)
}, [])
  const handleSearch = useCallback(
    (params: Partial<GetEventsParams>) => {
      debouncedSearch(params)
    },
    [debouncedSearch]
  )

  const clearFilters = () => {
    setSearchParams({ page: '1', limit: '6' })
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page < 1 || (meta && page > meta.totalPages)) return

    setSearchParams((prev) => ({
      ...prev,
      page: page.toString(),
    }))
  }

  return (
    <div className='min-h-screen bg-gray-50 px-12'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div className='flex flex-col items-center flex-1'>
          <Header />
          <h1 className='text-3xl font-bold text-gray-900 mt-4'>
            Event Manager
          </h1>
        </div>
      </div>

      {/* Event Form */}
      <div className='mb-8 flex justify-center'>
        <EventForm
          onSubmit={handleCreateOrUpdate}
          initialValues={editingEvent}
          key={editingEvent?._id || 'new-event'}
        />
      </div>

      {/* Filter Bar */}
      <EventfilterBar
        debouncedSearch={handleSearch}
        handleSearch={handleSearch}
        clearFilters={clearFilters}
      />

      {/* Events List */}
      {loading ? (
        <div className='flex flex-col justify-center items-center py-12'>
          <div className='text-lg text-gray-500 mb-12'>Loading events...</div>
          <Loader2 size={64} className='animate-spin text-blue-600' />
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-sm border p-8 flex flex-col justify-center items-center w-full mx-auto'>
          <EventList
            events={events}
            onEdit={setEditingEvent}
            onDelete={handleDelete}
          />

          {meta && meta?.totalPages > 1 && (
            <div className='py-6 border-t-2 mt-20 w-full'>
              <EventPagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                limit={meta.limit}
                total={meta.total}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventManager
