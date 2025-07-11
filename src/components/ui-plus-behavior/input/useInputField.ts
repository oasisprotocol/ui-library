import { useEffect, useMemo, useState } from 'react'
import {
  AllMessages,
  ValidatorControls,
  CoupledData,
  Decision,
  expandCoupledData,
  getAsArray,
  getReason,
  getVerdict,
  invertDecision,
  MessageAtLocation,
  SingleOrArray,
  ValidatorFunction,
  wrapValidatorOutput,
  checkMessagesForProblems,
  capitalizeFirstLetter,
} from './util'
import { MarkdownCode } from '../../ui/markdown'

type ValidatorBundle<DataType> = SingleOrArray<undefined | ValidatorFunction<DataType>>

/**
 * Data type for describing a field
 */
export type InputFieldProps<DataType> = {
  /**
   * The name of this field.
   *
   * Only used for debugging.
   */
  name: string

  /**
   * Optional description of this field.
   */
  description?: MarkdownCode

  /**
   * Optional label to use for this field.
   */
  label?: MarkdownCode

  /**
   * Do we normally want to have the label on the same line as the value?
   */
  compact?: boolean

  placeholder?: string
  initialValue: DataType

  /**
   * Optional function to normalize the value
   */
  cleanUp?: (value: DataType) => DataType

  /**
   * Is this field required?
   *
   * Optionally, you can also specify the corresponding error message.
   */
  required?: CoupledData

  validatorsGenerator?: (values: DataType) => ValidatorBundle<DataType>

  /**
   * Validators to apply to values
   */
  validators?: ValidatorBundle<DataType>

  /**
   * Should this field be shown?
   *
   * Default is true.
   *
   * You can also use the "hidden" field for the same effect,
   * just avoid contradictory values.
   */
  visible?: boolean

  /**
   * Should this field be hidden?
   *
   * Default is false.
   *
   * You can also use the "visible" field for the same effect,
   * just avoid contradictory values.
   */
  hidden?: boolean

  /**
   * Is this field enabled, that is, editable?
   *
   * Default is true.
   *
   * Optionally, you can also specify why it's currently disabled.
   *
   * You can also use the "disabled" field for the same effect,
   * just avoid contradictory values.
   */
  enabled?: Decision

  /**
   * Is this field disabled, that is, read only?
   *
   * Default is false.
   *
   * Optionally, you can also specify why is it disabled.
   *
   * You can also use the "enabled" field for the same effect,
   * just avoid contradictory values.
   */
  disabled?: Decision

  /**
   * Extra classes to apply to the container div
   */
  containerClassName?: string

  /**
   * Should this field expand horizontally to take all available space?
   *
   * (Defaults to true)
   */
  expandHorizontally?: boolean

  /**
   * Should this field be validated after every change?
   *
   * Default is false.
   */
  validateOnChange?: boolean

  /**
   * Should field be validated value on change even if it is empty?
   *
   * Default is false
   */
  validateEmptyOnChange?: boolean

  /**
   * Should we indicate when validation is running?
   *
   * Default is true.
   */
  showValidationPending?: boolean

  /**
   * Besides errors, should we also indicate successful validation status?
   *
   * Default is false.
   */
  showValidationSuccess?: boolean

  /**
   * Effects to run after the value changed
   */
  onValueChange?: (value: DataType, isStillFresh: () => boolean) => void
}

export type ValidationReason = 'change' | 'submit'
export type ValidationParams = {
  forceChange?: boolean
  reason: ValidationReason
  // A way to check if this validation request is still valid, or is it now stale (because of changed value)
  isStillFresh: () => boolean
}

/**
 * Data type passed from the field controller to the field UI widget
 */
export type InputFieldControls<DataType> = Pick<
  InputFieldProps<DataType>,
  'label' | 'compact' | 'description' | 'placeholder' | 'name'
> & {
  type: string
  visible: boolean
  enabled: boolean
  whyDisabled?: MarkdownCode
  containerClassName?: string
  expandHorizontally: boolean
  value: DataType
  cleanValue: DataType
  isEmpty: boolean
  setValue: (value: DataType) => void
  reset: () => void
  allMessages: AllMessages
  hasProblems: boolean
  isValidated: boolean

  /**
   * Run validation on this field.
   *
   * Will update field messages.
   * Returns true if there is an error.
   */
  validate: (params: ValidationParams) => Promise<boolean>
  validationPending: boolean
  validationStatusMessage: MarkdownCode | undefined
  validatorProgress: number | undefined
  indicateValidationPending: boolean
  indicateValidationSuccess: boolean
  clearErrorMessage: (id: string) => void
  clearMessagesAt: (location: string) => void
  clearAllMessages: () => void
}

export type InputFieldControlsInternal<DataType> = InputFieldControls<DataType> & {
  /**
   * This is for internal use only. Don't use from an application.
   */
  addMessage: (message: MessageAtLocation) => void
}

export type DataTypeTools<DataType> = {
  isEmpty: (data: DataType) => boolean
  isEqual: (data1: DataType, data2: DataType) => boolean
}

export const noType: DataTypeTools<void> = {
  isEmpty: () => true,
  isEqual: () => true,
}

const calculateVisible = (controls: Pick<InputFieldProps<any>, 'name' | 'hidden' | 'visible'>): boolean => {
  const { name, hidden, visible } = controls
  if (visible === undefined) {
    if (hidden === undefined) {
      return true
    } else {
      return !hidden
    }
  } else {
    if (hidden === undefined) {
      return visible
    } else {
      if (visible !== hidden) {
        return visible
      } else {
        throw new Error(
          `On field ${name}, props "hidden" and "visible" have been set to contradictory values!`
        )
      }
    }
  }
}

export const calculateEnabled = (
  controls: Pick<InputFieldProps<any>, 'name' | 'enabled' | 'disabled'>
): Decision => {
  const { name, enabled, disabled } = controls
  if (enabled === undefined) {
    if (disabled === undefined) {
      return true
    } else {
      return invertDecision(disabled)
    }
  } else {
    if (disabled === undefined) {
      return enabled
    } else {
      if (getVerdict(enabled, false) !== getVerdict(disabled, false)) {
        return {
          verdict: getVerdict(enabled, false),
          reason: getReason(disabled) ?? getReason(enabled),
        }
      } else {
        throw new Error(
          `On field ${name}, props "enabled" and "disabled" have been set to contradictory values!`
        )
      }
    }
  }
}

export function useInputFieldInternal<DataType>(
  type: string,
  props: InputFieldProps<DataType>,
  dataTypeControl: DataTypeTools<DataType>
): InputFieldControlsInternal<DataType> {
  const {
    name,
    label,
    compact,
    placeholder,
    description,
    initialValue,
    cleanUp,
    validators = [],
    validatorsGenerator,
    containerClassName,
    expandHorizontally = true,
    validateOnChange = false,
    validateEmptyOnChange = false,
    showValidationPending = true,
    showValidationSuccess = false,
    onValueChange,
  } = props

  const [required, requiredMessage] = expandCoupledData(props.required, [false, 'This field is required'])

  const [value, setValue] = useState<DataType>(initialValue)
  const cleanValue = cleanUp ? cleanUp(value) : value
  const [messages, setMessages] = useState<MessageAtLocation[]>([])

  let latestMessages: MessageAtLocation[] = [...messages]
  const addMessage = (message: MessageAtLocation) => {
    // We need to use a local variable to handle situations when addMessage is called multiple times
    // within a rendering cycle, i.e. before the state is updated.
    // If we didn't do this, we would always tty to add to the original array of messages,
    // thus constantly losing all previous additions within the cycle.
    latestMessages.push(message)
    setMessages([...latestMessages])
  }

  const allMessages = useMemo(() => {
    const messageTree: AllMessages = {}
    messages.forEach(message => {
      const { location } = message
      let bucket = messageTree[location]
      if (!bucket) bucket = messageTree[location] = []
      const localMessage: MessageAtLocation = { ...message }
      delete (localMessage as any).location
      bucket.push(localMessage)
    })
    return messageTree
  }, [messages])
  const hasProblems = Object.keys(allMessages).some(
    key => checkMessagesForProblems(allMessages[key]).hasError
  )
  const [isValidated, setIsValidated] = useState(false)
  const [lastValidatedData, setLastValidatedData] = useState<DataType | undefined>()
  const [validationPending, setValidationPending] = useState(false)

  const { isEmpty: isValueEmpty, isEqual: isValueEqual } = dataTypeControl

  const visible = calculateVisible(props)
  const enabled = calculateEnabled(props)

  const isEnabled = getVerdict(enabled, true)

  const [validatorProgress, setValidatorProgress] = useState<number>()
  const [validationStatusMessage, setValidationStatusMessage] = useState<MarkdownCode | undefined>()

  const validatorControls: Pick<ValidatorControls, 'updateStatus'> = {
    updateStatus: ({ progress, message }) => {
      if (progress) setValidatorProgress(progress)
      if (message) setValidationStatusMessage(message)
    },
  }

  const isEmpty = isValueEmpty(cleanValue)

  const validate = async (params: ValidationParams): Promise<boolean> => {
    if (!visible) {
      // We don't care about hidden fields
      return false
    }
    const { forceChange = false, reason, isStillFresh } = params
    const wasOK = isValidated && !hasProblems

    setValidationPending(true)
    setIsValidated(false)
    setValidationStatusMessage(undefined)
    setValidatorProgress(undefined)

    // Clean up the value
    const different = !isValueEqual(cleanValue, value)
    if (different && reason !== 'change') {
      setValue(cleanValue)
    }

    // Let's start to collect the new messages
    const currentMessages: MessageAtLocation[] = []
    let hasError = false

    // If it's required but empty, that's already an error
    if (required && isEmpty && (reason !== 'change' || validateEmptyOnChange)) {
      currentMessages.push(wrapValidatorOutput(requiredMessage, 'root', 'error')!)
      hasError = true
    }

    // Identify the user-configured validators to use
    const realValidators = getAsArray(
      validatorsGenerator ? validatorsGenerator(cleanValue) : validators
    ).filter((v): v is ValidatorFunction<DataType> => !!v)

    // Go through all the validators
    for (const validator of realValidators) {
      // Do we have anything to worry about from this validator?
      try {
        const validatorReport =
          hasError || !isStillFresh() || (!forceChange && wasOK && lastValidatedData === cleanValue)
            ? [] // If we already have an error, don't even bother with any more validators
            : await validator(cleanValue, { ...validatorControls, isStillFresh }, params.reason) // Execute the current validators

        getAsArray(validatorReport) // Maybe we have a single report, maybe an array. Receive it as an array.
          .map(report => wrapValidatorOutput(report, 'root', 'error')) // Wrap single strings to proper reports
          .forEach(message => {
            // Go through all the reports
            if (!message) return
            if (message.type === 'error') hasError = true
            currentMessages.push(message)
          })
      } catch (validatorError) {
        console.log('Error while running validator', validatorError)
        currentMessages.push(wrapValidatorOutput(`Error while checking: ${validatorError}`, 'root', 'error')!)
      }
    }

    if (isStillFresh()) {
      setMessages(currentMessages)
      setValidationPending(false)
      setIsValidated(true)
      setLastValidatedData(cleanValue)

      // Do we have any actual errors?
      return currentMessages.some(message => message.type === 'error')
    } else {
      return false
    }
  }

  const clearErrorMessage = (message: string) => {
    const oldLength = latestMessages.length
    latestMessages = latestMessages.filter(p => p.text !== message || p.type === 'info')
    setMessages(latestMessages)
    if (messages.length !== oldLength) setIsValidated(false)
  }

  const clearMessagesAt = (location: string): void => {
    latestMessages = latestMessages.filter(p => p.location !== location)
    setMessages(latestMessages)
    setIsValidated(false)
  }

  const clearAllMessages = () => {
    latestMessages = []
    setMessages([])
    setIsValidated(false)
  }

  useEffect(() => {
    let fresh = true
    if (onValueChange) {
      onValueChange(value, () => fresh)
    }
    if (visible) {
      if (validateOnChange && (!isEmpty || validateEmptyOnChange)) {
        void validate({ reason: 'change', isStillFresh: () => fresh })
      } else {
        clearAllMessages()
        setIsValidated(false)
      }
    }
    return () => {
      fresh = false
      return
    }
  }, [visible, JSON.stringify(cleanValue), validateOnChange, validateEmptyOnChange, isEmpty])

  const reset = () => setValue(initialValue)

  return {
    type,
    name,
    description,
    label: label ?? capitalizeFirstLetter(name),
    compact,
    placeholder,
    value,
    cleanValue,
    isEmpty,
    setValue,
    reset,
    allMessages: allMessages,
    hasProblems,
    isValidated,
    clearErrorMessage,
    clearMessagesAt,
    clearAllMessages,
    indicateValidationSuccess: showValidationSuccess,
    indicateValidationPending: showValidationPending,
    validate,
    validationPending: showValidationPending && validationPending,
    validationStatusMessage,
    validatorProgress,
    visible,
    enabled: isEnabled,
    whyDisabled: isEnabled ? undefined : getReason(enabled),
    containerClassName,
    expandHorizontally,
    addMessage,
  }
}

export function useInputField<DataType>(
  type: string,
  props: InputFieldProps<DataType>,
  dataTypeControl: DataTypeTools<DataType>
): InputFieldControls<DataType> {
  return useInputFieldInternal(type, props, dataTypeControl)
}
