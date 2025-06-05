import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button, buttonVariants } from './button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
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
  isActive?: boolean
  disabled?: boolean
  linkComponent?: C
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  Omit<React.ComponentProps<C>, 'ref'>

function PaginationLink<C extends React.ElementType = 'a'>({
  className,
  isActive,
  disabled,
  size = 'icon',
  linkComponent,
  ...props
}: PaginationLinkProps<C>) {
  const Component = linkComponent || 'a'

  return (
    <Component
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      data-disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
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
      size="default"
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
      size="default"
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
