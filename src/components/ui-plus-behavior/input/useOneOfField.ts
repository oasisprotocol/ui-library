import {
  calculateEnabled,
  DataTypeTools,
  InputFieldControls,
  InputFieldProps,
  IsEqualFunction,
  useInputField,
  ValidatorBundle,
} from './useInputField'
import { andDecisions, capitalizeFirstLetter, Decision, deny, expandCoupledData, getVerdict } from './util'
import { MarkdownCode } from '../../ui/markdown.tsx'

export interface HasToString {
  toString: () => string
}

export type Choice<DataType = string> = {
  value: DataType
  label?: MarkdownCode
  description?: string
  enabled?: Decision
  hidden?: boolean
  className?: string
}

type OneOfFieldProps<DataType = string> = Omit<
  InputFieldProps<DataType>,
  'initialValue' | 'placeholder' | 'cleanUp' | 'validateEmptyOnChange'
> & {
  initialValue?: DataType
  readonly choices: readonly (Choice<DataType> | DataType)[]
  hideDisabledChoices?: boolean
  disableIfOnlyOneVisibleChoice?: boolean
}

type NonNullableOneOfFieldProps<DataType> = OneOfFieldProps<DataType> & {}

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

export type OneOfFieldControls<DataType = string> = InputFieldControls<DataType> & {
  choices: readonly Choice[]
  renderValue: string
  setRenderValue: (value: string) => void
}

const simpleTypeTools: DataTypeTools<unknown> = {
  isEmpty: () => false,
  isEqual: (a, b) => a === b,
}

/**
 * Hook for defining a nun-nullable OneOf field
 */
export function useNonNullableOneOfField<DataType extends HasToString>(
  props: NonNullableOneOfFieldProps<DataType>,
  typeTools: DataTypeTools<DataType> = simpleTypeTools
): OneOfFieldControls<DataType> {
  const { choices, hideDisabledChoices, disableIfOnlyOneVisibleChoice } = props
  const visibleChoices = choices
    .map(expandChoice)
    .filter(choice => !choice.hidden && (!hideDisabledChoices || getVerdict(choice.enabled, true)))
  const availableChoices = visibleChoices.filter(
    choice => choice.value.toString() === PLEASE_SELECT || getVerdict(choice.enabled, true)
  )
  const initialValue = props.initialValue ?? (availableChoices[0] ?? visibleChoices[0]).value

  const originallyEnabled = calculateEnabled(props)
  const canSeeAlternatives =
    disableIfOnlyOneVisibleChoice &&
    visibleChoices.length <= 1 &&
    visibleChoices[0]?.value.toString() !== PLEASE_SELECT
      ? deny('Currently no other choice is available.')
      : true

  const controls = useInputField<DataType>(
    'oneOf',
    {
      ...props,
      enabled: andDecisions(originallyEnabled, canSeeAlternatives),
      disabled: undefined,
      initialValue,
      // required: [true, requiredMessage],
      validateEmptyOnChange: true,
      cleanUp: v => v,
    },
    typeTools
  )

  return {
    ...controls,
    renderValue: controls.value.toString(),
    setRenderValue: value => controls.setValue(value as unknown as DataType),
    choices: visibleChoices as unknown as Choice[],
  }
}

type NullableOneOfFieldProps<DataType extends HasToString> = OneOfFieldProps<DataType | undefined> & {
  placeholder: string | boolean
  required?: boolean
  canSelectPlaceholder?: boolean
}

const PLEASE_SELECT = '__PLEASE_SELECT__'

type InternalDataType<DataType> = DataType | typeof PLEASE_SELECT

/**
 * Hook for defining a nullable OneOf field
 */
function useNullableOneOfField<DataType extends HasToString>(
  props: NullableOneOfFieldProps<DataType>,
  typeTools: DataTypeTools<DataType> = simpleTypeTools
): OneOfFieldControls<DataType | undefined> {
  const {
    placeholder,
    canSelectPlaceholder = true,
    validators,
    validatorsGenerator,
    onValueChange,
    choices: realChoices,
    ...rest
  } = props

  const toInternal = (value: DataType | undefined): InternalDataType<DataType> =>
    value === undefined ? PLEASE_SELECT : value
  const toExternal = (value: InternalDataType<DataType>): DataType | undefined =>
    value === PLEASE_SELECT ? undefined : value

  const choices: Choice<InternalDataType<DataType>>[] = [
    {
      value: PLEASE_SELECT,
      label: placeholder === true ? 'Please select!' : (placeholder as MarkdownCode),
      enabled: canSelectPlaceholder,
      className: 'text-muted-foreground',
    },
    ...(realChoices as Choice<InternalDataType<DataType>>[]),
  ]

  const { isEmpty, isEqual } = typeTools

  const controls = useNonNullableOneOfField<InternalDataType<DataType>>(
    {
      ...rest,
      choices,
      onValueChange: (value, isStillFresh) => {
        if (onValueChange) {
          onValueChange(toExternal(value), isStillFresh)
        }
      },
      required: expandCoupledData(props.required, [false, 'Please select an option!']),
      validators: validators as ValidatorBundle<InternalDataType<DataType>>,
      validatorsGenerator: validatorsGenerator as (
        values: InternalDataType<DataType>
      ) => ValidatorBundle<InternalDataType<DataType>>,
    },
    {
      isEmpty: v => v === PLEASE_SELECT || isEmpty(v as DataType),
      isEqual: isEqual as IsEqualFunction<InternalDataType<DataType>>,
    }
  )

  return {
    ...controls,
    renderValue: controls.value.toString(),
    value: toExternal(controls.value),
    cleanValue: toExternal(controls.cleanValue),
    setValue: (value: DataType | undefined) => controls.setValue(toInternal(value)),
  }
}

// Signature for the non-nullable use case
export function useOneOfField<DataType extends HasToString>(
  props: NonNullableOneOfFieldProps<DataType>
): OneOfFieldControls<DataType>

// Signature for the nullable use case
export function useOneOfField<DataType extends HasToString>(
  props: NullableOneOfFieldProps<DataType>
): OneOfFieldControls<DataType | undefined>

// Common implementation
export function useOneOfField<DataType extends HasToString>(
  props: NonNullableOneOfFieldProps<DataType> | NullableOneOfFieldProps<DataType>
) {
  return 'placeholder' in props
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useNullableOneOfField(props as NullableOneOfFieldProps<DataType>)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useNonNullableOneOfField(props as NonNullableOneOfFieldProps<DataType>)
}
