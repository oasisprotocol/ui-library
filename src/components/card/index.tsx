import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Card as BaseCard, CardTitle as BaseCardTitle, CardContent as BaseCardContent } from '../ui/card'
import { cn } from '../../lib/utils'
export { CardFooter, CardHeader, CardAction, CardDescription } from '../ui/card'

const cardVariants = cva('rounded-md shadow-none', {
  variants: {
    variant: {
      default: '',
      layout: 'flex-1 gap-2 bg-background mb-4 md:mb-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type CardProps = React.ComponentProps<typeof BaseCard> & VariantProps<typeof cardVariants>

export const Card = ({ className, variant, ...props }: CardProps) => (
  <BaseCard className={cn(cardVariants({ variant }), className)} {...props} />
)

type CardTitleProps = React.ComponentProps<typeof BaseCardTitle>

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <BaseCardTitle
    className={cn('flex-1 flex justify-between [&>a]:font-medium [&>a]:text-sm', className)}
    {...props}
  />
)

type CardContentProps = React.ComponentProps<typeof BaseCardContent>

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <BaseCardContent className={cn('text-sm', className)} {...props} />
)
