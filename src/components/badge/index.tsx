import * as React from 'react'
import { Badge as BaseBadge, badgeVariants } from '../ui/badge'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const customVariants = {
  success:
    'border-transparent bg-success text-white [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60',
  'partial-success':
    'border-transparent bg-emerald-50 text-zinc-900 [a&]:hover:bg-emerald-100 focus-visible:ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400',
  info: 'border-transparent bg-blue-100 text-chart-5 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200 dark:text-chart-1',
  warning:
    'border-transparent bg-warning text-white [a&]:hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40',
  error:
    'border-transparent bg-error text-white [a&]:hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40',
  muted:
    'border-transparent bg-muted-foreground text-white [a&]:hover:bg-muted-foreground/90 focus-visible:ring-muted-foreground/20 dark:focus-visible:ring-muted-foreground/40',
  'token-erc-20':
    'bg-blue-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-blue-800 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200',
  'token-erc-721':
    'bg-pink-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-pink-800 [a&]:hover:bg-pink-200 focus-visible:ring-pink-200',
} as const

const customBadgeVariants = cva('', {
  variants: {
    variant: customVariants,
  },
})

type CustomVariant = keyof typeof customVariants
type BaseVariant = VariantProps<typeof badgeVariants>['variant']
const customVariantNames = Object.keys(customVariants) as CustomVariant[]

type BadgeProps = React.ComponentProps<'span'> & {
  variant?: BaseVariant | CustomVariant
  asChild?: boolean
}

export const Badge = ({ variant, className, asChild = false, ...props }: BadgeProps) => {
  const isCustomVariant = variant ? customVariantNames.includes(variant as CustomVariant) : false

  return (
    <BaseBadge
      asChild={asChild}
      variant={isCustomVariant ? undefined : (variant as BaseVariant)}
      className={cn(
        isCustomVariant && customBadgeVariants({ variant: variant as CustomVariant }),
        'rounded-full px-2.5 py-0.5 text-xs font-semibold [&>svg]:size-4 gap-2',
        className
      )}
      {...props}
    />
  )
}
