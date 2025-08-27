import { FC, PropsWithChildren, ReactNode } from 'react'
import classes from './index.module.css'
import { InputFieldControls } from './useInputField'
import { checkMessagesForProblems, FieldMessage } from './util'
import { FieldAndValidationMessage } from './FieldAndValidationMessage'
import { FieldStatusIndicators } from './FieldStatusIndicator'
import { cn } from '../../../lib'
import { MarkdownBlock } from '../../ui/markdown.tsx'
import { Label } from '../../ui/label.tsx'

export const WithValidation: FC<
  PropsWithChildren<{
    field: Pick<
      InputFieldControls<unknown>,
      | 'indicateValidationPending'
      | 'indicateValidationSuccess'
      | 'validationPending'
      | 'isValidated'
      | 'validationStatusMessage'
      | 'clearErrorMessage'
      | 'compact'
      | 'label'
    >
    fieldClasses?: string[]
    messages: FieldMessage[] | undefined
    extraWidget?: ReactNode | undefined
  }>
> = props => {
  const { field, fieldClasses = [], messages = [], children, extraWidget } = props
  const { hasWarning, hasError } = checkMessagesForProblems(messages)
  const { compact, label } = field
  return (
    <div
      className={cn(
        ...fieldClasses,
        hasError ? classes.fieldWithError : hasWarning ? classes.fieldWithWarning : ''
      )}
    >
      <div key="field-and-status" className="flex items-center space-x-2">
        {compact && (
          <Label>
            <MarkdownBlock code={label} className={'text-nowrap'} />
          </Label>
        )}
        {children}
        <FieldStatusIndicators key={'status'} {...field} messages={messages} />
        {extraWidget}
      </div>
      <FieldAndValidationMessage key="problems-and-status" messages={messages} {...field} />
    </div>
  )
}
