import * as React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

type TooltipWrapperProps = React.ComponentProps<typeof Tooltip> & {
  title: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  hidden?: boolean
  align?: 'start' | 'center' | 'end'
}

function TooltipWrapper({ title, children, side, sideOffset, hidden, align, ...props }: TooltipWrapperProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={sideOffset} hidden={hidden} align={align}>
        {title}
      </TooltipContent>
    </Tooltip>
  )
}

export { TooltipWrapper }
