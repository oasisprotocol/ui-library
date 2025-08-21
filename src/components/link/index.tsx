import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const linkVariants = cva(
  'leading-tight inline-flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        underline: 'underline underline-offset-4',
        hover: 'hover:underline hover:underline-offset-4',
      },
      textColor: {
        primary: 'text-primary hover:text-primary/80',
        inherit: 'text-inherit hover:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      textColor: 'primary',
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, textColor, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return <Comp className={cn(linkVariants({ variant, textColor, className }))} ref={ref} {...props} />
  }
)
Link.displayName = 'Link'

export { Link, linkVariants }
