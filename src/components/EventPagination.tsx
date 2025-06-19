import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from './ui/pagination'
  
  type PaginationItemsProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  type EventPaginationProps = {
    currentPage: number
    totalPages: number
    limit: number
    total: number
    onPageChange: (page: number) => void
  }
  
  const PaginationItems: React.FC<PaginationItemsProps> = ({
    currentPage,
    totalPages,
    onPageChange,
  }) => {
    const handlePageChange = (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return
      onPageChange(page)
    }
  
    const items = []
  
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
                  onClick={() => handlePageChange(i)}
                  isActive={currentPage === i}
                  className='cursor-pointer' size={undefined}          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
  
    return <>{items}</>
  }
  
  export const EventPagination: React.FC<EventPaginationProps> = ({
    currentPage,
    totalPages,
    limit,
    total,
    onPageChange,
  }) => {
    if (totalPages <= 1) return null
  
    return (
      <div className='flex flex-col items-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} size={undefined}              />
            </PaginationItem>
  
            <PaginationItems
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
  
            <PaginationItem>
              <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`cursor-pointer ${currentPage === totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : ''}`} size={undefined}              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  
        <div className='text-md text-gray-700 my-4'>
          Showing {(currentPage - 1) * limit + 1} to{' '}
          {Math.min(currentPage * limit, total)} of {total} results
        </div>
      </div>
    )
  }
  