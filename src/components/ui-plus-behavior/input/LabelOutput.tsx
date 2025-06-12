import { LabelControls } from './useLabel.ts'
import { FC } from 'react'
import classes from './index.module.css'

import { WithVisibility } from './WithVisibility.tsx'
import { WithLabelAndDescription } from './WithLabelAndDescription.tsx'
import { WithValidation } from './WithValidation.tsx'

export const LabelOutput: FC<LabelControls<any>> = props => {
  const { allMessages, classnames, renderedContent } = props

  return (
    <WithVisibility field={props}>
      <WithLabelAndDescription field={props}>
        <WithValidation
          field={props}
          messages={allMessages.root}
          fieldClasses={[classes.label, ...classnames]}
        >
          {renderedContent}
        </WithValidation>
      </WithLabelAndDescription>
    </WithVisibility>
  )
}
