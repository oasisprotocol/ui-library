import * as React from 'react'
import { Tooltip as BaseTooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { cn } from '../../lib/utils'

type TooltipProps = React.ComponentProps<typeof BaseTooltip> & {
  className?: string
  title: React.ReactNode
  disabled?: boolean
} & Pick<React.ComponentProps<typeof TooltipContent>, 'side' | 'sideOffset' | 'align'>

const TooltipContentNoArrow = ({
  className,
  children,
  sideOffset = 8, // Needed when arrow is hidden
  ...props
}: React.ComponentProps<typeof TooltipContent>) => {
  return (
    <TooltipContent
      className={cn(
        '[&>span]:hidden max-w-[400px] text-pretty bg-popover border text-popover-foreground text-sm shadow-md z-[9999]',
        className
      )}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </TooltipContent>
  )
}

export const Tooltip = ({
  className,
  title,
  children,
  side,
  sideOffset,
  align,
  disabled = false,
  ...props
}: TooltipProps) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <BaseTooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContentNoArrow className={className} side={side} sideOffset={sideOffset} align={align}>
        {title}
      </TooltipContentNoArrow>
    </BaseTooltip>
  )
}
