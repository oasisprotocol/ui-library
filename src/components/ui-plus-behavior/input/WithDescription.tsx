import { FC, PropsWithChildren } from 'react'
import { InputFieldControls } from './useInputField.ts'
import { MarkdownBlock } from '../../ui/markdown.tsx'

export const WithDescription: FC<
  PropsWithChildren<{ field: Pick<InputFieldControls<unknown>, 'description'> }>
> = props => {
  const { field, children } = props
  const { description } = field
  return description ? (
    <label>
      <MarkdownBlock code={description} className={'text-sm text-muted-foreground'} />
      {children}
    </label>
  ) : (
    children
  )
}
