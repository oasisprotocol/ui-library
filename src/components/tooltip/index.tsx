import * as React from 'react'
import { Tooltip as BaseTooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'

type TooltipProps = React.ComponentProps<typeof BaseTooltip> & {
  title: React.ReactNode
} & Pick<React.ComponentProps<typeof TooltipContent>, 'side' | 'sideOffset' | 'align'>

const TooltipContentNoArrow = ({
  children,
  sideOffset = 8, // Needed when arrow is hidden
  ...props
}: React.ComponentProps<typeof TooltipContent>) => {
  return (
    <TooltipContent className="[&>span]:hidden" sideOffset={sideOffset} {...props}>
      {children}
    </TooltipContent>
  )
}

export const Tooltip = ({ title, children, side, sideOffset, align, ...props }: TooltipProps) => {
  return (
    <BaseTooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContentNoArrow side={side} sideOffset={sideOffset} align={align}>
        {title}
      </TooltipContentNoArrow>
    </BaseTooltip>
  )
}
