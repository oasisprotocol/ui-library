import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl font-semibold text-foreground',
      h2: 'text-2xl leading-8 font-semibold text-foreground',
      h3: 'text-xl leading-7 font-semibold text-foreground',
      h4: 'text-sm leading-5 font-semibold text-foreground',
      p: 'text-sm leading-5 text-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
    },
    textColor: {
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
}

function defaultTagFor(variant?: TypographyProps['variant']): keyof JSX.IntrinsicElements {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      return variant
    case 'blockquote':
      return 'blockquote'
    default:
      return 'p'
  }
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ textColor, asChild = false, variant, className, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : defaultTagFor(variant)
    return <Comp ref={ref} className={cn(typographyVariants({ variant, textColor }), className)} {...props} />
  }
)
Typography.displayName = 'Typography'
