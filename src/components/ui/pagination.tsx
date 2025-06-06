import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

type PaginationProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
  totalCount: number
  selectedPage: number
  showFirstPageButton?: boolean
  showLastPageButton?: boolean
  onPageChange?: (page: number) => void
  isTotalCountClipped?: boolean
  rowsPerPage: number
}

function Pagination({
  className,
  totalCount,
  selectedPage,
  showFirstPageButton = false,
  showLastPageButton = false,
  onPageChange,
  isTotalCountClipped = false,
  rowsPerPage,
  ...props
}: PaginationProps) {
  if (totalCount <= 0 || selectedPage <= 0 || rowsPerPage <= 0) {
    return null
  }
  const totalCountBoundary = totalCount + (selectedPage - 1) * rowsPerPage
  const count = Math.ceil(totalCountBoundary / rowsPerPage)

  if (count <= 0) {
    return null
  }

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 7

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious onClick={() => handlePageChange(selectedPage - 1)} disabled={selectedPage <= 1} />
      </PaginationItem>
    )

    if (showFirstPageButton) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => handlePageChange(1)}
            disabled={selectedPage <= 1}
            aria-label="Go to first page"
          >
            First
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (count <= maxVisiblePages) {
      for (let i = 1; i <= count; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      const leftSiblingIndex = Math.max(selectedPage - 1, 1)
      const rightSiblingIndex = Math.min(selectedPage + 1, count)
      const shouldShowLeftDots = leftSiblingIndex > 2
      const shouldShowRightDots = rightSiblingIndex < count - 1
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 5
        for (let i = 1; i <= leftItemCount; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }

        items.push(<PaginationEllipsis key="ellipsis-right" />)

        items.push(
          <PaginationItem key={count}>
            <PaginationLink onClick={() => handlePageChange(count)}>{count}</PaginationLink>
          </PaginationItem>
        )
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
          </PaginationItem>
        )

        items.push(<PaginationEllipsis key="ellipsis-left" />)

        const rightItemCount = 5
        for (let i = count - rightItemCount + 1; i <= count; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
          </PaginationItem>
        )

        items.push(<PaginationEllipsis key="ellipsis-left" />)

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }

        items.push(<PaginationEllipsis key="ellipsis-right" />)

        items.push(
          <PaginationItem key={count}>
            <PaginationLink onClick={() => handlePageChange(count)}>{count}</PaginationLink>
          </PaginationItem>
        )
      }
    }

    if (showLastPageButton && !isTotalCountClipped) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageChange(count)}
            disabled={selectedPage >= count}
            aria-label="Go to last page"
          >
            Last
          </PaginationLink>
        </PaginationItem>
      )
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext onClick={() => handlePageChange(selectedPage + 1)} disabled={selectedPage >= count} />
      </PaginationItem>
    )

    return items
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    >
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </nav>
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps<C extends React.ElementType = 'a'> = {
  selected?: boolean
  disabled?: boolean
  linkComponent?: C
} & Omit<React.ComponentProps<C>, 'ref'>

function PaginationLink<C extends React.ElementType = 'a'>({
  className,
  selected,
  disabled,
  linkComponent,
  ...props
}: PaginationLinkProps<C>) {
  const Component = linkComponent || 'a'

  return (
    <Component
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={selected}
      data-disabled={disabled}
      className={cn(
        buttonVariants({
          variant: selected ? 'outline' : 'ghost',
          size: 'default',
        }),
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  label = '',
  linkComponent,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      linkComponent={linkComponent}
      {...props}
    >
      <ChevronLeftIcon />
      {label && <span className="hidden sm:block">{label}</span>}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  label,
  linkComponent,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      linkComponent={linkComponent}
      {...props}
    >
      {label && <span className="hidden sm:block">{label}</span>}
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
