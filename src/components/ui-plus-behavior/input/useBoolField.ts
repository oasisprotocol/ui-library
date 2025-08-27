import { InputFieldControls, InputFieldProps, useInputField } from './useInputField.ts'
import { MarkdownCode } from '../../ui/markdown.tsx'

export type FullBoolFieldProps = Omit<
  InputFieldProps<boolean>,
  'initialValue' | 'placeholder' | 'compact'
> & {
  initialValue?: boolean
  preferredWidget?: 'checkbox' | 'switch'
}

export type BooleanFieldControls = InputFieldControls<boolean> &
  Pick<FullBoolFieldProps, 'preferredWidget'> & {}

export type BoolFieldProps = FullBoolFieldProps | string

export function useBooleanField(name: string, description?: MarkdownCode): BooleanFieldControls

export function useBooleanField(props: FullBoolFieldProps): BooleanFieldControls

export function useBooleanField(rawProps: BoolFieldProps, description?: MarkdownCode): BooleanFieldControls {
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
