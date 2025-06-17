import { InputFieldControls, InputFieldProps, useInputField } from './useInputField.ts'
import { getAsArray, SingleOrArray } from './util'
import { ReactNode, useId } from 'react'
import { renderMarkdown, TagName, MarkdownCode } from '../../ui/markdown.tsx'
import { HasToString } from './useOneOfField.ts'

export type RendererFunction<DataType> = (value: DataType, tagName: string) => ReactNode

export type LabelProps<DataType = MarkdownCode> = Pick<
  InputFieldProps<DataType>,
  | 'name'
  | 'label'
  | 'compact'
  | 'description'
  | 'visible'
  | 'hidden'
  | 'containerClassName'
  | 'expandHorizontally'
  | 'validators'
  | 'validateOnChange'
  | 'showValidationSuccess'
> & {
  /**
   * Which HTML tag should contain this label?
   *
   * The default is <snap>
   */
  tagName?: TagName

  /**
   * What extra classes should we apply to the field's div?
   */
  classnames?: SingleOrArray<string>

  /**
   * Optional render function to use to get the HTML content from the (formatted) string.
   *
   * My default, we render as MarkDown. If markdown rendering is not appropriate
   * (for example. you want images) please provide a render function.
   */
  renderer?: RendererFunction<DataType>

  /**
   * The current value to display
   */
  value: DataType
}

export type LabelControls<DataType> = Omit<
  InputFieldControls<DataType>,
  'placeholder' | 'enabled' | 'whyDisabled' | 'setValue' | 'initialValue' | 'reset'
> & {
  classnames: string[]
  renderedContent: ReactNode
}

export function useLabel<DataType extends HasToString = MarkdownCode>(
  rawProps: LabelProps<DataType> | string
): LabelControls<DataType> {
  const autoId = useId()
  const props = (
    typeof rawProps === 'string' ? { name: autoId, value: rawProps } : rawProps
  ) as LabelProps<DataType>
  const {
    classnames = [],
    // formatter,
    tagName = 'span',
    label = '',
    value,
  } = props
  const { renderer = (value, tagName: TagName) => renderMarkdown(value.toString(), tagName) } = props

  const controls = useInputField(
    'label',
    {
      ...props,
      initialValue: value,
      label,
    },
    {
      isEmpty: value => !value,
      isEqual: (a, b) => a === b,
    }
  )

  const renderedContent = renderer(value, tagName)
  const visible = controls.visible && value.toString() !== ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { placeholder, enabled, whyDisabled, setValue, reset, ...otherControls } = controls

  return {
    ...otherControls,
    value,
    classnames: getAsArray(classnames),
    renderedContent,
    visible,
  }
}
