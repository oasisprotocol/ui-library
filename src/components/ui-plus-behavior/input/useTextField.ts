import { InputFieldControls, InputFieldProps, useInputField } from './useInputField'
import { CoupledData, expandCoupledData, getAsArray, getNumberMessage, NumberMessageTemplate } from './util'
import { useCallback } from 'react'
import { MarkdownCode } from '../../ui/markdown.tsx'

type TextFieldProps = Omit<InputFieldProps<string>, 'initialValue'> & {
  initialValue?: string

  /**
   * Minimum length of text
   *
   * You can specify this as a number, or as an array,
   * the number first and then the error message,
   * which you can provide a string, or a function that
   * returns a string, including the specified minimum length.
   *
   * Examples:
   *      5
   *      [5, "This is too short"]
   *      [10, l => `Please use at least %{l} characters!`]
   */
  minLength?: CoupledData<number, NumberMessageTemplate>

  /**
   * Maximum length of each item
   *
   * You can specify this as a number, or as an array,
   * the number first and then the error message,
   * which you can provide a string, or a function that
   * returns a string, including the specified maximum length.
   *
   * Examples:
   *      100
   *      [40, "This is too long"]
   *      [50, l => `Please use at most %{l} characters!`]*
   */
  maxLength?: CoupledData<number, NumberMessageTemplate>

  autoFocus?: boolean
  onEnter?: (value: string) => void
  hideInput?: boolean
}

export type TextFieldControls = InputFieldControls<string> & {
  autoFocus: boolean
  inputType: string
  onEnter: (() => void) | undefined
}

export function useTextField<DataType>(props: TextFieldProps): TextFieldControls

export function useTextField(name: string, description?: MarkdownCode): TextFieldControls

export function useTextField(
  rawProps: TextFieldProps | string,
  description?: MarkdownCode
): TextFieldControls {
  const props = (typeof rawProps === 'string' ? { name: rawProps, description } : rawProps) as TextFieldProps
  const { initialValue = '', validatorsGenerator, validators, autoFocus = false, onEnter, hideInput } = props

  const [minLength, tooShortMessage] = expandCoupledData(props.minLength, [
    1,
    minLength => `Please specify at least ${minLength} characters!`,
  ])

  const [maxLength, tooLongMessage] = expandCoupledData(props.maxLength, [
    1000,
    maxLength => `Please specify at most ${maxLength} characters!`,
  ])

  const controls = useInputField<string>(
    'text',
    {
      ...props,
      initialValue,
      validators: undefined,
      cleanUp: props.cleanUp ?? ((s: string) => s.trim()),
      validatorsGenerator: value => [
        // Check minimum length
        minLength
          ? () =>
              value !== '' && value.length < minLength!
                ? `tooShort: ${getNumberMessage(tooShortMessage, minLength)} (Currently: ${value.length})`
                : undefined
          : undefined,

        // Check maximum length
        maxLength
          ? () =>
              value !== '' && value.length > maxLength!
                ? `tooLong: ${getNumberMessage(tooLongMessage, maxLength)} (Currently: ${value.length})`
                : undefined
          : undefined,

        // Any custom validators
        ...getAsArray(validatorsGenerator ? validatorsGenerator(value) : validators),
      ],
    },
    {
      isEmpty: text => !text,
      isEqual: (a, b) => a === b,
    }
  )

  const enterHandler = useCallback(() => {
    if (onEnter) onEnter(controls.value)
  }, [controls.value, onEnter])

  return {
    ...controls,
    inputType: hideInput ? 'password' : 'text',
    autoFocus,
    onEnter: enterHandler,
  }
}
