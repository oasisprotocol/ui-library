import React, { FC, KeyboardEventHandler, useCallback } from 'react'
// import classes from './index.module.css'
import { TextFieldControls } from './useTextField'
import { WithValidation } from './WithValidation'
import { WithLabelAndDescription } from './WithLabelAndDescription'
import { WithVisibility } from './WithVisibility'
import { MaybeWithTooltip } from '../tooltip'
import { Input } from '../../ui/input'
import { checkMessagesForProblems } from './util'

export const TextInput: FC<TextFieldControls> = props => {
  const { name, value, placeholder, setValue, allMessages, enabled, whyDisabled, autoFocus, onEnter } = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [setValue]
  )

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = useCallback(
    event => {
      if (event.key == 'Enter') {
        if (onEnter) onEnter()
      }
    },
    [onEnter]
  )

  const {
    // hasWarning,
    hasError,
  } = checkMessagesForProblems(allMessages.root)

  return (
    <WithVisibility field={props}>
      <WithLabelAndDescription field={props}>
        <WithValidation
          field={props}
          messages={allMessages.root}
          // fieldClasses={[classes.textValue]}
        >
          <MaybeWithTooltip overlay={whyDisabled}>
            <Input
              aria-invalid={hasError}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              // className={classes.textValue}
              disabled={!enabled}
              autoFocus={autoFocus}
              onKeyDown={handleKeyPress}
            />
          </MaybeWithTooltip>
        </WithValidation>
      </WithLabelAndDescription>
    </WithVisibility>
  )
}
