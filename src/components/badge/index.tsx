import * as React from 'react'
import { Badge as BaseBadge, badgeVariants } from '../ui/badge'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const successVariant =
  'border-transparent bg-success text-white [a&]:hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60'

const infoVariant =
  'border-transparent bg-blue-100 text-chart-5 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200 dark:text-chart-1'

const tokenErc20Variant =
  'bg-blue-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-blue-800 [a&]:hover:bg-blue-200 focus-visible:ring-blue-200'

const tokenErc721Variant =
  'bg-pink-100 text-zinc-900 outline outline-1 outline-offset-[-1px] outline-pink-800 [a&]:hover:bg-pink-200 focus-visible:ring-pink-200'

const customBadgeVariants = (props: {
  variant?:
    | VariantProps<typeof badgeVariants>['variant']
    | 'success'
    | 'info'
    | 'token-erc-20'
    | 'token-erc-721'
}) => {
  if (props?.variant === 'success') {
    return successVariant
  }
  if (props?.variant === 'info') {
    return infoVariant
  }
  if (props?.variant === 'token-erc-20') {
    return tokenErc20Variant
  }
  if (props?.variant === 'token-erc-721') {
    return tokenErc721Variant
  }
  return badgeVariants(props as Parameters<typeof badgeVariants>[0])
}

type BadgeProps = Omit<React.ComponentProps<typeof BaseBadge>, 'variant'> & {
  variant?:
    | VariantProps<typeof badgeVariants>['variant']
    | 'success'
    | 'info'
    | 'token-erc-20'
    | 'token-erc-721'
}

export const Badge = ({ variant, ...props }: BadgeProps) => {
  return <BaseBadge className={cn(customBadgeVariants({ variant }))} {...props} />
}
