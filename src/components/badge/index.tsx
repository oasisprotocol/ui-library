import * as React from 'react'
import { Badge as BaseBadge, badgeVariants } from '../ui/badge'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const successVariant =
  'border-transparent bg-success text-white [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60'

const customBadgeVariants = (props: {
  variant?: VariantProps<typeof badgeVariants>['variant'] | 'success'
}) => {
  if (props?.variant === 'success') {
    return successVariant
  }
  return badgeVariants(props as Parameters<typeof badgeVariants>[0])
}

type BadgeProps = Omit<React.ComponentProps<typeof BaseBadge>, 'variant'> & {
  variant?: VariantProps<typeof badgeVariants>['variant'] | 'success'
}

export const Badge = ({ variant, ...props }: BadgeProps) => {
  return <BaseBadge className={cn(customBadgeVariants({ variant }))} {...props} />
}
