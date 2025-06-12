import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { checkMessagesForProblems, FieldMessage } from './util'
import { InputFieldControls } from './useInputField'
import { MotionDiv } from '../Animations'
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'

export const FieldStatusIndicators: FC<
  Pick<
    InputFieldControls<any>,
    'indicateValidationPending' | 'indicateValidationSuccess' | 'validationPending' | 'isValidated'
  > & { messages: FieldMessage[] }
> = props => {
  const { indicateValidationPending, indicateValidationSuccess, validationPending, isValidated, messages } =
    props
  const { hasError, hasWarning } = checkMessagesForProblems(messages)
  const hasNoProblems = !hasError && !hasWarning
  const showSuccess = isValidated && indicateValidationSuccess && hasNoProblems
  const showPending = validationPending && indicateValidationPending
  const showError = hasError && !validationPending

  return (
    <AnimatePresence>
      {(showPending || showSuccess || showError) && (
        <MotionDiv
          reason={'fieldStatus'}
          layout
          key="field-status"
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          exit={{ width: 0 }}
          // transition={{ duration: 2 }}
        >
          {showPending && (
            <MotionDiv
              reason={'fieldStatus'}
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoaderCircle width={24} height={24} />
              {/*TODO: should spin*/}
            </MotionDiv>
          )}
          {showSuccess && (
            <MotionDiv
              reason={'fieldStatus'}
              key={'success'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CircleCheck size="1em" className={'text-success'} />
            </MotionDiv>
          )}
          {showError && (
            <MotionDiv
              reason={'fieldStatus'}
              key={'error'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CircleAlert size="1em" className={'text-destructive'} />
            </MotionDiv>
          )}
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
