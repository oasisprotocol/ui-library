import * as React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

type TooltipWrapperProps = React.ComponentProps<typeof Tooltip> & {
  title: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  hidden?: boolean
  align?: 'start' | 'center' | 'end'
}

function TooltipWrapper({
  title,
  children,
  side,
  sideOffset = 8,
  hidden,
  align,
  ...props
}: TooltipWrapperProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        hidden={hidden}
        align={align}
        className="text-pretty border bg-popover text-popover-foreground shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.10),0px_2px_4px_-1px_rgba(0,0,0,0.06)]"
      >
        {title}
      </TooltipContent>
    </Tooltip>
  )
}

export { TooltipWrapper }
