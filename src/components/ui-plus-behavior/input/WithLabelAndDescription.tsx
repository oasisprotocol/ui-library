import { FC, PropsWithChildren } from 'react'
import { InputFieldControls } from './useInputField'
import classes from './index.module.css'
import { MarkdownBlock } from '../../ui/markdown'
import { Label } from '../../ui/label'
import { cn } from '../../../lib'

export const WithLabelAndDescription: FC<
  PropsWithChildren<{ field: Pick<InputFieldControls<unknown>, 'label' | 'description' | 'compact'> }>
> = ({ field: { label, description, compact }, children }) =>
  compact ? (
    description ? (
      <Label className={cn('w-full', classes.fieldLabelTag)}>
        <MarkdownBlock code={description} className={'text-muted-foreground text-sm'} />
        {children}
      </Label>
    ) : (
      children
    )
  ) : !!label || !!description ? (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>
        <MarkdownBlock code={label} />
      </Label>
      <MarkdownBlock code={description} className={'text-muted-foreground text-sm'} />
      {children}
    </div>
  ) : (
    children
  )
