import { InputFieldControls, InputFieldProps, useInputField } from './useInputField'
import { CoupledData, DateMessageTemplate, expandCoupledData, getAsArray, getDateMessage } from './util'

type DateType = 'datetime-local' | 'data' | 'time'

type DateFieldProps = Omit<InputFieldProps<Date>, 'initialValue' | 'placeholder'> & {
  /**
   * What time of input do we want here?
   */
  type?: DateType

  /**
   * Initial date
   *
   * If not set, we will use "now"
   */
  initialValue?: Date

  /**
   * Minimum date
   *
   * You can specify this as a Date, or as an array,
   * the date first and then the error message,
   * which you can provide as a string, or as a function that
   * returns a string, including the specified minimum date.
   */
  minDate?: CoupledData<Date | undefined, DateMessageTemplate>

  /**
   * Maximum date
   *
   * You can specify this as a Date, or as an array,
   * the Date first and then the error message,
   * which you can provide as a string, or as a function that
   * returns a string, including the specified maximum date.
   */
  maxDate?: CoupledData<Date | undefined, DateMessageTemplate>
}

export type DateFieldControls = Omit<InputFieldControls<Date>, 'placeholder'> & {
  minDate: Date | undefined
  maxDate: Date | undefined
  type: DateType
}

export function useDateField(props: DateFieldProps): DateFieldControls {
  const { initialValue = new Date(), validatorsGenerator, validators, type = 'datetime-local' } = props

  const [minDate, tooEarlyMessage] = expandCoupledData(props.minDate, [
    undefined,
    minDate => `Please use a date after ${minDate.toLocaleString()}`,
  ])

  const [maxDate, tooLateMessage] = expandCoupledData(props.maxDate, [
    undefined,
    maxDate => `Please use a date before ${maxDate.toLocaleString()}`,
  ])

  const controls = useInputField<Date>(
    'date',
    {
      ...props,
      initialValue,
      validators: undefined,
      validatorsGenerator: value => [
        // Check minimum date
        minDate
          ? () => (value.getTime() < minDate.getTime() ? getDateMessage(tooEarlyMessage, minDate) : undefined)
          : undefined,

        // Check maximum date
        maxDate
          ? () => (value.getTime() > maxDate.getTime() ? getDateMessage(tooLateMessage, maxDate) : undefined)
          : undefined,

        // Any custom validators
        ...getAsArray(validatorsGenerator ? validatorsGenerator(value) : validators),
      ],
    },
    {
      isEmpty: value => value === undefined,
      isEqual: (a, b) => !!a && !!b && a.getTime() === b.getTime(),
    }
  )

  return {
    ...controls,
    minDate,
    maxDate,
    type,
  }
}
