import React from 'react'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'
import type { GetEventsParams } from '../types'

type EventfilterBarProps = {
  debouncedSearch: (params: Partial<GetEventsParams>) => void
  handleSearch: (newParams: Partial<GetEventsParams>) => void
  clearFilters: () => void
}

const EventfilterBar: React.FC<EventfilterBarProps> = ({
  debouncedSearch,
  handleSearch,
  clearFilters,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-sm border p-6 my-12 w-full max-w-7xl mx-auto'>
      <div className='flex flex-wrap gap-4 items-end'>
        <div className='flex-1 min-w-64'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Search by title
          </label>
          <Input
            type='text'
            placeholder='Enter event title...'
            onChange={(e: { target: { value: string } }) =>
              debouncedSearch({ title: e.target.value })
            }
          />
        </div>

        <div className='min-w-40'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Filter by date
          </label>
          <Input
            type='date'
            onChange={(e: { target: { value: string } }) =>
              handleSearch({ date: e.target.value })
            }
          />
        </div>

        <div className='min-w-48'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Filter by location
          </label>
          <Input
            type='text'
            placeholder='Enter location...'
            onChange={(e: { target: { value: string } }) =>
              debouncedSearch({ location: e.target.value })
            }
          />
        </div>

        <div className='min-w-48'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Sort by
          </label>
          <Select onValueChange={(value) => handleSearch({ sort: value })}>
            <SelectTrigger>
              <SelectValue placeholder='Choose sorting...' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='createdAt:desc'>Newest First</SelectItem>
              <SelectItem value='createdAt:asc'>Oldest First</SelectItem>
              <SelectItem value='date:desc'>Event Date (Latest)</SelectItem>
              <SelectItem value='date:asc'>Event Date (Earliest)</SelectItem>
              <SelectItem value='title:asc'>Title (A-Z)</SelectItem>
              <SelectItem value='title:desc'>Title (Z-A)</SelectItem>
              <SelectItem value='location:asc'>Location (A-Z)</SelectItem>
              <SelectItem value='location:desc'>Location (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant='outline'
          onClick={clearFilters}
          className='whitespace-nowrap'
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

export default EventfilterBar
