import { FC, PropsWithChildren } from 'react'
import { InputFieldControls } from './useInputField.ts'
import classes from './index.module.css'
import { MarkdownBlock } from '../../ui/markdown.tsx'

export const WithDescription: FC<
  PropsWithChildren<{ field: Pick<InputFieldControls<any>, 'description'> }>
> = props => {
  const { field, children } = props
  const { description } = field
  return description ? (
    <label>
      <div className={classes.fieldDescription}>
        <MarkdownBlock code={description} />
      </div>
      {children}
    </label>
  ) : (
    children
  )
}
