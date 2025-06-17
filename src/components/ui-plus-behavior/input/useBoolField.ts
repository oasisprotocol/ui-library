import { InputFieldControls, InputFieldProps, useInputField } from './useInputField.ts'
import { MarkdownCode } from '../../ui/markdown.tsx'

type BoolFieldProps = Omit<InputFieldProps<boolean>, 'initialValue' | 'placeholder' | 'compact'> & {
  initialValue?: boolean
  preferredWidget?: 'checkbox' | 'switch'
}

export type BooleanFieldControls = InputFieldControls<boolean> & Pick<BoolFieldProps, 'preferredWidget'> & {}

export function useBooleanField(name: string, description?: MarkdownCode): BooleanFieldControls

export function useBooleanField(props: BoolFieldProps): BooleanFieldControls

export function useBooleanField(
  rawProps: BoolFieldProps | string,
  description?: MarkdownCode
): BooleanFieldControls {
  const props = typeof rawProps === 'string' ? { name: rawProps, description } : rawProps
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
