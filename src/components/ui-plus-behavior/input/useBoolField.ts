import { InputFieldControls, InputFieldProps, useInputField } from './useInputField.ts'

type BoolFieldProps = Omit<InputFieldProps<boolean>, 'initialValue' | 'placeholder' | 'label' | 'compact'> & {
  initialValue?: boolean
  label: string
  preferredWidget?: 'checkbox' | 'switch'
}

export type BooleanFieldControls = InputFieldControls<boolean> &
  Pick<BoolFieldProps, 'preferredWidget'> & {
    label: string
  }

export function useBooleanField(props: BoolFieldProps): BooleanFieldControls {
  const { label, initialValue = false, preferredWidget = 'checkbox' } = props

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
    label,
    preferredWidget,
  }
}
