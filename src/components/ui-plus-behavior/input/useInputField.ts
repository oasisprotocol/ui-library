import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
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
  camelToTitleCase,
  MessageMaybeAtLocation,
} from './util'
import { MarkdownCode } from '../../ui/markdown'

const VALIDATION_DEBUG_MODE = false

export type ValidatorBundle<DataType> = SingleOrArray<undefined | ValidatorFunction<DataType>>

/**
 * Data type for describing a field
 */
export type InputFieldProps<DataType> = {
  /**
   * The name of this field. Use camelCase.
   *
   * User for automatically generated labels, and also for debugging.
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
  isStillFresh?: () => boolean
}

/**
 * Data type passed from the field controller to the field UI widget
 */
export type InputFieldControls<DataType> = Pick<
  InputFieldProps<DataType>,
  'label' | 'compact' | 'description' | 'placeholder' | 'name'
> & {
  id: string
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
  clearAllMessages: (reason: string) => void
}

export type InputFieldControlsInternal<DataType> = InputFieldControls<DataType> & {
  /**
   * This is for internal use only. Don't use from an application.
   */
  addMessage: (message: MessageAtLocation) => void
}

export type IsEqualFunction<DataType> = (data1: DataType, data2: DataType) => boolean
export type DataTypeTools<DataType> = {
  isEmpty: (data: DataType) => boolean
  isEqual: IsEqualFunction<DataType>
}

export const noType: DataTypeTools<void> = {
  isEmpty: () => true,
  isEqual: () => true,
}

const calculateVisible = (
  controls: Pick<InputFieldProps<unknown>, 'name' | 'hidden' | 'visible'>
): boolean => {
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
  controls: Pick<InputFieldProps<unknown>, 'name' | 'enabled' | 'disabled'>
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

const noValidators: ValidatorBundle<unknown> = []

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
    validators = noValidators,
    validatorsGenerator,
    containerClassName,
    expandHorizontally = true,
    validateOnChange = false,
    validateEmptyOnChange = false,
    showValidationPending = true,
    showValidationSuccess = false,
    onValueChange,
  } = props
  const id = useId()
  const debugLog = useCallback(
    (message: unknown, ...more: unknown[]) => {
      if (!VALIDATION_DEBUG_MODE) return
      console.log(`[${id}] "${name}"`, message, ...more)
    },
    [id, name]
  )

  const [required, requiredMessage] = expandCoupledData(props.required, [false, 'This field is required'])

  const [value, setValue] = useState<DataType>(initialValue)
  const cleanValue = cleanUp ? cleanUp(value) : value
  const [messages, setMessages] = useState<MessageAtLocation[]>([])

  const addMessage = useCallback(
    (message: MessageAtLocation) => {
      debugLog('Updating messages in addMessage')
      setMessages(messages => [...messages, message])
    },
    [debugLog]
  )

  const allMessages = useMemo(() => {
    const messageTree: AllMessages = {}
    messages.forEach(message => {
      const { location } = message
      let bucket = messageTree[location]
      if (!bucket) bucket = messageTree[location] = []
      const localMessage: MessageMaybeAtLocation = { ...message }
      delete localMessage.location
      bucket.push(localMessage)
    })
    return messageTree
  }, [messages])
  const hasProblems = Object.keys(allMessages).some(
    key => checkMessagesForProblems(allMessages[key]).hasError
  )
  const validationCounterRef = useRef<number>(0)
  const isValidatedRef = useRef(false)
  const [isValidated, setIsValidated] = useState(false)
  const lastValidatedValueRef = useRef<DataType | undefined>(undefined)
  const lastSeenValueRef = useRef<DataType>(undefined)
  const validationPendingRef = useRef<number>()
  const [validationPending, setValidationPending] = useState(false)

  const { isEmpty: isValueEmpty, isEqual: isEqualRaw } = dataTypeControl

  const isValueEqual: IsEqualFunction<DataType | undefined> = useCallback(
    (a, b) =>
      (a === undefined && b === undefined) || (a !== undefined && b !== undefined && isEqualRaw(a, b)),
    [isEqualRaw]
  )

  const visible = calculateVisible(props)
  const enabled = calculateEnabled(props)

  const isEnabled = getVerdict(enabled, true)

  const [validatorProgress, setValidatorProgress] = useState<number>()
  const [validationStatusMessage, setValidationStatusMessage] = useState<MarkdownCode | undefined>()

  const isEmpty = isValueEmpty(cleanValue)

  const clearErrorMessage = useCallback(
    (message: string) => {
      debugLog(`Updating messages in clearErrorMessage('${message}')`)
      setMessages(messages => messages.filter(p => p.text !== message || p.type === 'info'))
      isValidatedRef.current = false
      setIsValidated(false)
    },
    [debugLog]
  )

  const clearMessagesAt = useCallback(
    (location: string) => {
      debugLog(`Updating messages in clearMessagesAt('${location}')`)
      setMessages(messages => messages.filter(p => p.location !== location))
      isValidatedRef.current = false
      setIsValidated(false)
    },
    [debugLog]
  )

  const clearAllMessages = useCallback(
    (reason: string) => {
      debugLog('Updating messages in clearAllMessages()', reason)
      setMessages([])
      isValidatedRef.current = false
      setIsValidated(false)
    },
    [debugLog]
  )

  const validate = useCallback(
    async (valueToValidate: DataType, params: ValidationParams): Promise<boolean> => {
      if (!visible) {
        // We don't care about hidden fields
        return false
      }
      const { forceChange = false, reason, isStillFresh: clientStillInterested } = params
      const wasOK = isValidatedRef.current && !hasProblems

      const validationSessionId = ++validationCounterRef.current
      debugLog('Validating', valueToValidate, 'because', reason, `==> validation #${validationSessionId}`)

      const isStillFresh = () =>
        (!clientStillInterested || clientStillInterested()) &&
        validationPendingRef.current === validationSessionId

      const cleanValue = cleanUp ? cleanUp(valueToValidate) : valueToValidate
      const isEmpty = isValueEmpty(cleanValue)
      validationPendingRef.current = validationSessionId
      setValidationPending(true)
      isValidatedRef.current = false
      setIsValidated(false)
      setValidationStatusMessage(undefined)
      setValidatorProgress(undefined)

      // Clean up the value
      const different = !isValueEqual(cleanValue, valueToValidate)
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

      const validatorControls: Pick<ValidatorControls, 'updateStatus'> = {
        updateStatus: props => {
          if (isStillFresh && !isStillFresh()) {
            // This session is obsolete, ignore any output
            // debugLog('Ignoring status update from obsolete session')
            return
          }
          if (typeof props === 'string') {
            setValidationStatusMessage(props)
          } else {
            const { progress, message } = props
            if (progress) setValidatorProgress(progress)
            if (message) setValidationStatusMessage(message)
          }
        },
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
            hasError ||
            (isStillFresh && !isStillFresh()) ||
            (!forceChange && wasOK && isValueEqual(lastValidatedValueRef.current, cleanValue))
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
          currentMessages.push(
            wrapValidatorOutput(`Error while checking: ${validatorError}`, 'root', 'error')!
          )
        }
      }

      if (!isStillFresh || isStillFresh()) {
        debugLog(`Updating messages after finished validation #${validationSessionId}`, currentMessages)
        debugLog('isStillFresh', isStillFresh)
        setMessages(currentMessages)
        validationPendingRef.current = undefined
        setValidationPending(false)
        isValidatedRef.current = true
        setIsValidated(true)
        lastValidatedValueRef.current = cleanValue

        // Do we have any actual errors?
        return currentMessages.some(message => message.type === 'error')
      } else {
        debugLog(`Validation #${validationSessionId} cancelled`)
        return false
      }
    },
    [
      debugLog,
      hasProblems,
      cleanUp,
      isValueEmpty,
      isValueEqual,
      required,
      requiredMessage,
      validateEmptyOnChange,
      validators,
      validatorsGenerator,
      visible,
    ]
  )

  const cleanValueString = JSON.stringify(cleanValue)

  // Sometimes, when the value changes, we are supposed to validate
  useEffect(() => {
    if (isValueEqual(value, lastSeenValueRef.current)) return
    debugLog('Change', lastSeenValueRef.current, '=>', value)
    lastSeenValueRef.current = value
    const isStillFresh = () => isValueEqual(lastSeenValueRef.current, value)
    if (onValueChange) {
      onValueChange(value, isStillFresh)
    }
    if (visible) {
      if (validateOnChange && (!isEmpty || validateEmptyOnChange)) {
        // Yes, we are supposed to validate
        void validate(value, { reason: 'change', isStillFresh })
      } else {
        // No need to validate, but we still want to clear out any error messages,
        // because they are no longer relevant to the new value
        clearAllMessages('value change effect')
        isValidatedRef.current = false
        setValidationPending(false)
        validationPendingRef.current = undefined
        setIsValidated(false)
      }
    }
  }, [
    visible,
    cleanValueString,
    validateOnChange,
    validateEmptyOnChange,
    isEmpty,
    isValueEqual,
    clearAllMessages,
    onValueChange,
    validate,
    value,
    debugLog,
  ])

  const reset = () => setValue(initialValue)

  return {
    id,
    type,
    name,
    description,
    label: label ?? camelToTitleCase(name),
    compact,
    placeholder,
    value,
    cleanValue,
    isEmpty,
    setValue,
    reset,
    allMessages,
    hasProblems,
    isValidated,
    clearErrorMessage,
    clearMessagesAt,
    clearAllMessages,
    indicateValidationSuccess: showValidationSuccess,
    indicateValidationPending: showValidationPending,
    validate: params => validate(value, params),
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
