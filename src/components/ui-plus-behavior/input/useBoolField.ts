import { InputFieldControls, InputFieldProps, useInputField } from './useInputField.ts'

type BoolFieldProps = Omit<InputFieldProps<boolean>, 'initialValue' | 'placeholder' | 'compact'> & {
  initialValue?: boolean
  preferredWidget?: 'checkbox' | 'switch'
}

export type BooleanFieldControls = InputFieldControls<boolean> & Pick<BoolFieldProps, 'preferredWidget'> & {}

export function useBooleanField(props: BoolFieldProps): BooleanFieldControls {
  const { initialValue = false, preferredWidget = 'checkbox' } = props

  const controls = useInputField<boolean>(
    'boolean',
    {
      ...props,
      initialValue,
    },
    {
      isEmpty: () => false,
      isEqual: (a, b) => a === b,
    }
  )

  return {
    ...controls,
    preferredWidget,
  }
}
