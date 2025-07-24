import * as React from 'react'
import { Tooltip as BaseTooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'

type TooltipProps = React.ComponentProps<typeof BaseTooltip> & {
  title: React.ReactNode
} & Pick<React.ComponentProps<typeof TooltipContent>, 'side' | 'sideOffset' | 'align'>

export const Tooltip = ({ title, children, side, sideOffset, align, ...props }: TooltipProps) => {
  return (
    <BaseTooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} align={align}>
        {title}
      </TooltipContent>
    </BaseTooltip>
  )
}
