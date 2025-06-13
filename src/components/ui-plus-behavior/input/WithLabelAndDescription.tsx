import { FC, PropsWithChildren } from 'react'
import { InputFieldControls } from './useInputField.ts'
import classes from './index.module.css'
import { MarkdownBlock } from '../../ui/markdown.tsx'
import { Label } from '../../ui/label.tsx'

export const WithLabelAndDescription: FC<
  PropsWithChildren<{ field: Pick<InputFieldControls<any>, 'label' | 'description' | 'compact'> }>
> = props => {
  const { field, children } = props
  const { label, description, compact } = field

  if (compact) {
    return description ? (
      <label className={classes.fieldLabelTag}>
        <div className={classes.fieldDescription}>
          <MarkdownBlock code={description} />
        </div>
        {children}
      </label>
    ) : (
      children
    )
  } else {
    return !!label || !!description ? (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>
          <MarkdownBlock code={label} />
        </Label>
        <div className={classes.fieldDescription}>
          <MarkdownBlock code={description} />
        </div>
        {children}
      </div>
    ) : (
      children
    )
  }
}
