import { FieldConfiguration } from './validation'
import { FC } from 'react'
import { InputField } from './InputField'
import { InputFieldControls } from './useInputField'
import classes from './index.module.css'
import { WithVisibility } from './WithVisibility'
import { cn } from '../../../lib'

type InputFieldGroupProps = {
  /**
   * The fields to display
   */
  fields: FieldConfiguration

  /**
   * Should stuff be aligned to the right?
   * (Default is to the left)
   */
  alignRight?: boolean

  /**
   * Should we expand to 100% of horizontal space?
   * (Defaults to true)
   */
  expandHorizontally?: boolean

  /**
   * Extra classname to apply to field group
   */
  className?: string
}

export const InputFieldGroup: FC<InputFieldGroupProps> = ({
  fields,
  alignRight,
  expandHorizontally = true,
  className,
}) =>
  fields.some(row => (Array.isArray(row) ? row.some(col => col.visible) : row.visible)) ? (
    <div
      className={cn(
        classes.fieldGroup,
        expandHorizontally ? classes.fieldGroupExpand : classes.fieldGroupCompact,
        className
      )}
    >
      {fields.map((row, index) =>
        Array.isArray(row) ? (
          <WithVisibility
            key={`field-${index}`}
            field={{
              visible: row.some(controls => controls.visible),
              name: `group-${index}`,
              containerClassName: cn(
                alignRight ? classes.fieldRowRight : classes.fieldRow,
                expandHorizontally ? classes.fieldRowExpand : classes.fieldRowCompact
              ),
              expandHorizontally: expandHorizontally,
            }}
            padding={false}
          >
            {row.map(field => (
              <InputField key={field.name} controls={{ ...field, expandHorizontally }} />
            ))}
          </WithVisibility>
        ) : (
          <InputField key={row.name} controls={row as InputFieldControls<unknown>} />
        )
      )}
    </div>
  ) : undefined
