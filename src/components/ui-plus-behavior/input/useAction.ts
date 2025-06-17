import { InputFieldControls, InputFieldProps, noType, useInputFieldInternal } from './useInputField.ts'
import { useState } from 'react'
import { FieldLike } from './validation'
import { MarkdownCode } from '../../ui/markdown'
import { ExecutionContext } from './ExecutionContext'
import { Button } from '../../ui/button.tsx'
import { capitalizeFirstLetter } from './util'

type FullConfirmationRequest = {
  title: MarkdownCode
  description: MarkdownCode | undefined
  okLabel: MarkdownCode
  cancelLabel: MarkdownCode
} & Partial<Pick<Parameters<typeof Button>[0], 'variant'>>

type ConfirmationRequest = boolean | MarkdownCode | Partial<FullConfirmationRequest>

export type ActionProps<ReturnData = void> = Omit<
  InputFieldProps<void>,
  | 'compact'
  | 'placeholder'
  | 'initialValue'
  | 'cleanUp'
  | 'required'
  | 'validatorsGenerator'
  | 'validators'
  | 'validateOnChange'
  | 'showValidationPending'
  | 'showValidationSuccess'
  | 'onValueChange'
> &
  Partial<Pick<Parameters<typeof Button>[0], 'variant' | 'size' | 'color'>> & {
    pendingLabel?: MarkdownCode
    confirmationNeeded?: ConfirmationRequest
    action: (context: ExecutionContext) => ReturnData
  }

export type ActionControls<ReturnData> = FieldLike<void> &
  Omit<
    InputFieldControls<void>,
    'value' | 'setValue' | 'reset' | 'hasProblems' | 'validate' | 'validatorProgress'
  > &
  Pick<ActionProps, 'color' | 'variant' | 'size'> & {
    isPending: boolean
    confirmationNeeded: FullConfirmationRequest | undefined
    onConfirmationProvided: () => void
    onConfirmationDenied: () => void

    execute: () => Promise<ReturnData>
  }

export function useAction<ReturnType>(props: ActionProps<ReturnType>): ActionControls<ReturnType> {
  const { color, variant, size, action, pendingLabel, name, label, confirmationNeeded } = props
  const controls = useInputFieldInternal(
    'action',
    { ...props, initialValue: undefined, showValidationPending: false },
    noType
  )

  const [isPending, setIsPending] = useState(false)
  const [statusMessage, setStatusMessage] = useState<MarkdownCode | undefined>()
  const [isConfirming, setIsConfirming] = useState(false)
  const [pendingExecution, setPendingExecution] = useState<{
    resolve: (value: ReturnType | PromiseLike<ReturnType>) => void
    reject: (reason?: unknown) => void
  }>()

  const getFullConfirmationRequest = (): FullConfirmationRequest | undefined => {
    if (confirmationNeeded === undefined || confirmationNeeded === false) return undefined
    const defaultRequest: FullConfirmationRequest = {
      title: label ?? capitalizeFirstLetter(name),
      description: 'Are you sure?',
      okLabel: 'Continue',
      cancelLabel: 'Cancel',
    }
    if (confirmationNeeded === true) return defaultRequest

    if (typeof confirmationNeeded === 'object') {
      return {
        ...defaultRequest,
        ...confirmationNeeded,
      }
    } else {
      return {
        ...defaultRequest,
        description: confirmationNeeded as MarkdownCode,
      }
    }
  }

  const doExecute = async (): Promise<ReturnType> => {
    setIsPending(true)
    const context: ExecutionContext = {
      setStatus: message => {
        setStatusMessage(message)
      },
      log: (message, ...optionalParams) =>
        controls.addMessage({
          text: [message, ...optionalParams].join(' '),
          type: 'info',
          location: 'root',
        }),
      warn: (message, ...optionalParams) =>
        controls.addMessage({
          text: [message, ...optionalParams].join(' '),
          type: 'warning',
          location: 'root',
        }),
      error: (message, ...optionalParams) =>
        controls.addMessage({
          text: [message, ...optionalParams].join(' '),
          type: 'error',
          location: 'root',
        }),
    }
    try {
      controls.clearAllMessages('Execute action')
      return await action(context)
    } catch (error: unknown) {
      context.error(error)
      throw error
    } finally {
      setIsPending(false)
    }
  }

  const execute = async (): Promise<ReturnType> => {
    if (isPending) {
      throw new Error(`Action ${props.name} is already running!`)
    }
    if (confirmationNeeded) {
      setIsConfirming(true)
      return new Promise<ReturnType>((resolve, reject) => {
        setPendingExecution({ resolve, reject })
      })
    } else {
      return await doExecute()
    }
  }

  const onConfirmationProvided = async () => {
    setIsConfirming(false)
    const result = await doExecute()
    pendingExecution?.resolve(result)
  }

  const onConfirmationDenied = async () => {
    setIsConfirming(false)
    pendingExecution?.reject('User cancelled the action')
  }

  return {
    ...controls,
    color,
    variant,
    size,
    label: isPending
      ? (pendingLabel ?? label ?? capitalizeFirstLetter(name))
      : (label ?? capitalizeFirstLetter(name)),
    isPending,
    validationPending: isPending,
    validationStatusMessage: statusMessage,
    execute,
    confirmationNeeded: isConfirming ? getFullConfirmationRequest() : undefined,
    onConfirmationProvided,
    onConfirmationDenied,
  }
}
