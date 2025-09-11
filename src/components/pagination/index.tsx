import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import {
  PaginationContent,
  PaginationEllipsis as BasePaginationEllipsis,
  PaginationItem,
} from '../ui/pagination'
import { buttonVariants } from '../ui/button'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<typeof BasePaginationEllipsis>) => {
  return <BasePaginationEllipsis className={cn('max-md:size-5', className)} {...props} />
}

type PaginationActionType = 'first' | 'last' | 'page' | 'next' | 'prev'

interface PaginationItemProps {
  type: PaginationActionType
  page?: number
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

interface PaginationItemSlots {
  first?: React.ReactNode | (() => React.ReactNode)
  last?: React.ReactNode | (() => React.ReactNode)
}

interface PaginationProps extends Omit<React.ComponentProps<'nav'>, 'onChange'> {
  totalCount: number
  selectedPage: number
  showFirstPageButton?: boolean
  showLastPageButton?: boolean
  onPageChange?: (page: number) => void
  isTotalCountClipped?: boolean
  rowsPerPage: number
  renderItem?: (item: PaginationItemProps) => React.ReactNode
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
  renderItem,
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

    const prevItem: PaginationItemProps = {
      type: 'prev',
      page: selectedPage > 1 ? selectedPage - 1 : undefined,
      disabled: selectedPage <= 1,
      onClick: () => handlePageChange(selectedPage - 1),
    }

    if (renderItem) {
      items.push(<PaginationItem key="prev">{renderItem(prevItem)}</PaginationItem>)
    } else {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            onClick={() => handlePageChange(selectedPage - 1)}
            disabled={selectedPage <= 1}
          />
        </PaginationItem>
      )
    }

    if (showFirstPageButton) {
      const firstItem: PaginationItemProps = {
        type: 'first',
        page: 1,
        disabled: selectedPage <= 1,
        onClick: () => handlePageChange(1),
      }

      if (renderItem) {
        items.push(<PaginationItem key="first">{renderItem(firstItem)}</PaginationItem>)
      } else {
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
    }

    if (count <= maxVisiblePages) {
      for (let i = 1; i <= count; i++) {
        const pageItem: PaginationItemProps = {
          type: 'page',
          page: i,
          selected: selectedPage === i,
          onClick: () => handlePageChange(i),
        }

        if (renderItem) {
          items.push(<PaginationItem key={i}>{renderItem(pageItem)}</PaginationItem>)
        } else {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }
      }
    } else {
      const leftSiblingIndex = Math.max(selectedPage - 1, 1)
      const rightSiblingIndex = Math.min(selectedPage + 1, count)
      const shouldShowLeftDots = leftSiblingIndex > 2
      const shouldShowRightDots = rightSiblingIndex < count - 1
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 5
        for (let i = 1; i <= leftItemCount; i++) {
          const pageItem: PaginationItemProps = {
            type: 'page',
            page: i,
            selected: selectedPage === i,
            onClick: () => handlePageChange(i),
          }

          if (renderItem) {
            items.push(<PaginationItem key={i}>{renderItem(pageItem)}</PaginationItem>)
          } else {
            items.push(
              <PaginationItem key={i}>
                <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }
        }

        items.push(<PaginationEllipsis key="ellipsis-right" />)

        const lastPageItem: PaginationItemProps = {
          type: 'page',
          page: count,
          selected: selectedPage === count,
          onClick: () => handlePageChange(count),
        }

        if (renderItem) {
          items.push(<PaginationItem key={count}>{renderItem(lastPageItem)}</PaginationItem>)
        } else {
          items.push(
            <PaginationItem key={count}>
              <PaginationLink onClick={() => handlePageChange(count)}>{count}</PaginationLink>
            </PaginationItem>
          )
        }
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        const firstPageItem: PaginationItemProps = {
          type: 'page',
          page: 1,
          selected: selectedPage === 1,
          onClick: () => handlePageChange(1),
        }

        if (renderItem) {
          items.push(<PaginationItem key={1}>{renderItem(firstPageItem)}</PaginationItem>)
        } else {
          items.push(
            <PaginationItem key={1}>
              <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
          )
        }

        items.push(<PaginationEllipsis key="ellipsis-left" />)

        const rightItemCount = 5
        for (let i = count - rightItemCount + 1; i <= count; i++) {
          const pageItem: PaginationItemProps = {
            type: 'page',
            page: i,
            selected: selectedPage === i,
            onClick: () => handlePageChange(i),
          }

          if (renderItem) {
            items.push(<PaginationItem key={i}>{renderItem(pageItem)}</PaginationItem>)
          } else {
            items.push(
              <PaginationItem key={i}>
                <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        const firstPageItem: PaginationItemProps = {
          type: 'page',
          page: 1,
          selected: selectedPage === 1,
          onClick: () => handlePageChange(1),
        }

        if (renderItem) {
          items.push(<PaginationItem key={1}>{renderItem(firstPageItem)}</PaginationItem>)
        } else {
          items.push(
            <PaginationItem key={1}>
              <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
          )
        }

        items.push(<PaginationEllipsis key="ellipsis-left" />)

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          const pageItem: PaginationItemProps = {
            type: 'page',
            page: i,
            selected: selectedPage === i,
            onClick: () => handlePageChange(i),
          }

          if (renderItem) {
            items.push(<PaginationItem key={i}>{renderItem(pageItem)}</PaginationItem>)
          } else {
            items.push(
              <PaginationItem key={i}>
                <PaginationLink selected={selectedPage === i} onClick={() => handlePageChange(i)}>
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }
        }

        items.push(<PaginationEllipsis key="ellipsis-right" />)

        const lastPageItem: PaginationItemProps = {
          type: 'page',
          page: count,
          selected: selectedPage === count,
          onClick: () => handlePageChange(count),
        }

        if (renderItem) {
          items.push(<PaginationItem key={count}>{renderItem(lastPageItem)}</PaginationItem>)
        } else {
          items.push(
            <PaginationItem key={count}>
              <PaginationLink onClick={() => handlePageChange(count)}>{count}</PaginationLink>
            </PaginationItem>
          )
        }
      }
    }

    if (showLastPageButton && !isTotalCountClipped) {
      const lastItem: PaginationItemProps = {
        type: 'last',
        page: count,
        disabled: selectedPage >= count,
        onClick: () => handlePageChange(count),
      }

      if (renderItem) {
        items.push(<PaginationItem key="last">{renderItem(lastItem)}</PaginationItem>)
      } else {
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
    }

    if (isTotalCountClipped) {
      items.push(<PaginationEllipsis key="ellipsis-right-total-count-clipped" />)
    }

    const nextItem: PaginationItemProps = {
      type: 'next',
      page: selectedPage < count ? selectedPage + 1 : undefined,
      disabled: selectedPage >= count,
      onClick: () => handlePageChange(selectedPage + 1),
    }

    if (renderItem) {
      items.push(<PaginationItem key="next">{renderItem(nextItem)}</PaginationItem>)
    } else {
      items.push(
        <PaginationItem key="next">
          <PaginationNext
            onClick={() => handlePageChange(selectedPage + 1)}
            disabled={selectedPage >= count}
          />
        </PaginationItem>
      )
    }

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

type PaginationLinkProps<C extends React.ElementType = 'a'> = {
  selected?: boolean
  disabled?: boolean
  linkComponent?: C
  slots?: PaginationItemSlots
  type?: PaginationActionType
  page?: number
} & Omit<React.ComponentProps<C>, 'ref'>

function PaginationLink<C extends React.ElementType = 'a'>({
  className,
  selected,
  disabled,
  linkComponent,
  slots,
  children,
  type,
  page,
  ...props
}: PaginationLinkProps<C>) {
  const Component = linkComponent || 'a'
  let content: React.ReactNode = null

  if (slots && type) {
    if (type === 'first' && slots.first) {
      content = typeof slots.first === 'function' ? slots.first() : slots.first
    } else if (type === 'last' && slots.last) {
      content = typeof slots.last === 'function' ? slots.last() : slots.last
    }
  }

  const finalContent =
    children ||
    content ||
    (() => {
      if (type === 'page' && page !== undefined) {
        return page
      } else if (type === 'first') {
        return 'First'
      } else if (type === 'last') {
        return 'Last'
      } else if (type === 'next') {
        return <ChevronRightIcon />
      } else if (type === 'prev') {
        return <ChevronLeftIcon />
      }
      return null
    })()

  return (
    <Component
      aria-current={selected ? 'page' : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={selected}
      data-disabled={disabled}
      className={cn(
        'max-md:size-8',
        buttonVariants({
          variant: selected ? 'outline' : 'ghost',
          size: 'icon',
        }),
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      {finalContent}
    </Component>
  )
}

function PaginationPrevious({
  className,
  linkComponent,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      linkComponent={linkComponent}
      type="prev"
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationLink>
  )
}

function PaginationNext({ className, linkComponent, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      linkComponent={linkComponent}
      type="next"
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  )
}
export { Pagination, PaginationLink, PaginationNext, PaginationPrevious }
export type { PaginationItemProps }
