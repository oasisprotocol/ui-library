import React, { FC, useCallback } from 'react'
import { DateFieldControls } from './useDateField'

import { WithVisibility } from './WithVisibility'
import { WithLabelAndDescription } from './WithLabelAndDescription'
import { WithValidation } from './WithValidation'
import { MaybeWithTooltip } from '../tooltip'
import { Input } from '../../ui/input.tsx'
import { checkMessagesForProblems } from './util'

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const DateInput: FC<DateFieldControls> = props => {
  const { name, value, setValue, allMessages, enabled, whyDisabled } = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setValue(new Date(event.target.value)),
    [setValue]
  )

  const { hasError } = checkMessagesForProblems(allMessages.root)

  return (
    <WithVisibility field={props}>
      <WithLabelAndDescription field={props}>
        <WithValidation field={props} messages={allMessages.root}>
          <MaybeWithTooltip overlay={whyDisabled}>
            <Input
              aria-invalid={hasError}
              name={name}
              type={'datetime-local'}
              value={value ? convertToDateTimeLocalString(value) : undefined}
              onChange={handleChange}
              disabled={!enabled}
            />
          </MaybeWithTooltip>
        </WithValidation>
      </WithLabelAndDescription>
    </WithVisibility>
  )
}
