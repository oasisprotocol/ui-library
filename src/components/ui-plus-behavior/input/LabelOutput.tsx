import { LabelControls } from './useLabel.ts'
import { FC } from 'react'

import { WithVisibility } from './WithVisibility.tsx'
import { WithLabelAndDescription } from './WithLabelAndDescription.tsx'
import { WithValidation } from './WithValidation.tsx'
import { Label } from '../../ui/label.tsx'

export const LabelOutput: FC<LabelControls<unknown>> = props => {
  const { allMessages, classnames, renderedContent } = props

  return (
    <WithVisibility field={props}>
      <WithLabelAndDescription field={props}>
        <WithValidation field={props} messages={allMessages.root} fieldClasses={classnames}>
          <Label>{renderedContent}</Label>
        </WithValidation>
      </WithLabelAndDescription>
    </WithVisibility>
  )
}
