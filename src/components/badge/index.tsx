import * as React from 'react'
import { Badge as BaseBadge, badgeVariants } from '../ui/badge'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const customBadgeVariants = cva('', {
  variants: {
    variant: {
      success:
        'border-transparent bg-success text-white [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60',
      'partial-success':
        'border-transparent bg-emerald-50 text-zinc-900 [a&]:hover:bg-emerald-100 focus-visible:ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400',
      info: 'border-transparent bg-blue-100 text-chart-5 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200 dark:text-chart-1',
      error:
        'border-transparent bg-error text-white [a&]:hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40',
      'token-erc-20':
        'bg-blue-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-blue-800 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200',
      'token-erc-721':
        'bg-pink-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-pink-800 [a&]:hover:bg-pink-200 focus-visible:ring-pink-200',
    },
  },
})

type BadgeProps = React.ComponentProps<'span'> & {
  variant?:
    | VariantProps<typeof badgeVariants>['variant']
    | 'success'
    | 'partial-success'
    | 'info'
    | 'error'
    | 'token-erc-20'
    | 'token-erc-721'
  asChild?: boolean
}

export const Badge = ({ variant, className, asChild = false, ...props }: BadgeProps) => {
  const isCustomVariant =
    variant === 'success' ||
    variant === 'partial-success' ||
    variant === 'info' ||
    variant === 'error' ||
    variant === 'token-erc-20' ||
    variant === 'token-erc-721'

  return (
    <BaseBadge
      asChild={asChild}
      variant={isCustomVariant ? undefined : variant}
      className={cn(isCustomVariant && customBadgeVariants({ variant }), className)}
      {...props}
    />
  )
}
