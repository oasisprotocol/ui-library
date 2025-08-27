import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { FieldMessageList } from './FieldMessageDisplay'
import { FieldMessage } from './util'
import { InputFieldControls } from './useInputField'
import { MotionDiv } from '../Animations'
import { MarkdownBlock } from '../../ui/markdown'

export const FieldAndValidationMessage: FC<
  Pick<InputFieldControls<unknown>, 'validationPending' | 'validationStatusMessage' | 'clearErrorMessage'> & {
    messages: FieldMessage[]
  }
> = props => {
  const { validationPending, validationStatusMessage, messages, clearErrorMessage } = props

  return (
    <>
      <FieldMessageList messages={messages} onRemove={clearErrorMessage} />
      <AnimatePresence mode={'wait'}>
        {!!validationStatusMessage && validationPending && (
          <MotionDiv
            reason={'fieldValidationErrors'}
            layout
            key={'problems-and-validation-messages'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
            role={'status-message'}
          >
            <MarkdownBlock code={validationStatusMessage} />
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}
