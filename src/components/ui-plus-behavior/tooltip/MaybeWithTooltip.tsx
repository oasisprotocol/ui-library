import { FC, ReactNode } from 'react'
import { MarkdownCode, MarkdownBlock } from '../../ui/markdown'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'

type Content = Exclude<ReactNode, undefined | null | string | number | boolean | Iterable<ReactNode>>

type TooltipProps = Pick<Parameters<typeof TooltipContent>[0], 'side'> &
  Pick<Parameters<typeof Tooltip>[0], 'open' | 'delayDuration'> & {
    overlay: MarkdownCode | undefined
    children: Content
  }

export const MaybeWithTooltip: FC<TooltipProps> = props => {
  const { overlay } = props
  const { open, delayDuration } = props // props for Tooltip
  const { side } = props /// Props for TooltipContent

  return overlay ? (
    <Tooltip open={open} delayDuration={delayDuration}>
      <TooltipTrigger>{props.children}</TooltipTrigger>
      <TooltipContent side={side}>
        <MarkdownBlock code={overlay} />
      </TooltipContent>
    </Tooltip>
  ) : (
    props.children
  )
}
