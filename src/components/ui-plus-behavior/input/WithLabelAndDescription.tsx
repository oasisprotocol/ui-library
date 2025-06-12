import { FC, PropsWithChildren } from 'react'
import { InputFieldControls } from './useInputField.ts'
import classes from './index.module.css'
import { MarkdownBlock } from '../../ui/markdown.tsx'

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
      <label className={classes.fieldLabelTag}>
        <div className={classes.fieldLabel}>{label}</div>
        <div className={classes.fieldDescription}>
          <MarkdownBlock code={description} />
        </div>
        {children}
      </label>
    ) : (
      children
    )
  }
}
