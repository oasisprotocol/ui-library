import { calculateEnabled, InputFieldControls, InputFieldProps, useInputField } from './useInputField'
import { andDecisions, capitalizeFirstLetter, Decision, deny, getVerdict } from './util'
import { MarkdownCode } from '../../ui/markdown.tsx'

export type Choice<DataType = string> = {
  value: DataType
  label?: MarkdownCode
  description?: string
  enabled?: Decision
  hidden?: boolean
}

type OneOfFieldProps<DataType = string> = Omit<
  InputFieldProps<DataType>,
  'initialValue' | 'required' | 'placeholder'
> & {
  initialValue?: DataType
  readonly choices: readonly (Choice<DataType> | DataType)[]
  requiredMessage?: string
  hideDisabledChoices?: boolean
  disableIfOnlyOneVisibleChoice?: boolean
}

interface HasToString {
  toString: () => string
}

function expandChoice<DataType extends HasToString>(choice: DataType | Choice<DataType>): Choice<DataType> {
  if (typeof choice === 'object') {
    const fullChoice = choice as Choice<DataType>
    return {
      ...fullChoice,
      label: fullChoice.label ?? capitalizeFirstLetter(fullChoice.value.toString().trim()),
    }
  } else {
    return {
      value: choice as DataType,
      label: capitalizeFirstLetter((choice as DataType).toString().trim()),
    }
  }
}

export type OneOfFieldControls<DataType> = InputFieldControls<DataType> & {
  choices: readonly Choice<DataType>[]
}

export function useOneOfField<DataType extends HasToString>(
  props: OneOfFieldProps<DataType>
): OneOfFieldControls<DataType> {
  const {
    choices,
    requiredMessage = 'Please select an option!',
    hideDisabledChoices,
    disableIfOnlyOneVisibleChoice,
  } = props
  const visibleChoices = choices
    .map(expandChoice)
    .filter(choice => !choice.hidden && (!hideDisabledChoices || getVerdict(choice.enabled, true)))
  const enabledChoices = visibleChoices.filter(choice => getVerdict(choice.enabled, true))
  const initialValue = props.initialValue ?? (enabledChoices[0] ?? visibleChoices[0]).value

  const originallyEnabled = calculateEnabled(props)
  const canSeeAlternatives =
    disableIfOnlyOneVisibleChoice && visibleChoices.length <= 1
      ? deny('Currently no other choice is available.')
      : true

  const controls = useInputField<DataType>(
    'oneOf',
    {
      ...props,
      enabled: andDecisions(originallyEnabled, canSeeAlternatives),
      disabled: undefined,
      initialValue,
      required: [true, requiredMessage],
      cleanUp: v => v,
    },
    {
      isEmpty: () => false,
      isEqual: (a, b) => a === b,
    }
  )

  return {
    ...controls,
    choices: visibleChoices,
  }
}
