import { MarkdownCode } from '../../../ui/markdown'
import { SingleOrArray } from './arrays'

export type FieldMessageType = 'info' | 'warning' | 'error'

export type FieldMessage = {
  signature?: string
  text: MarkdownCode
  type?: FieldMessageType
}

// Check all messages for problems
export const checkMessagesForProblems = (messages: FieldMessage[] = []) => ({
  hasWarning: messages.some(message => message.type === 'warning'),
  hasError: messages.some(message => message.type === 'error'),
})

export type MessageMaybeAtLocation = FieldMessage & { location?: string }
export type MessageAtLocation = FieldMessage & { location: string }

/**
 * Validators can return their findings on various detail levels
 */
export type ValidatorOutput = MessageMaybeAtLocation | MarkdownCode | undefined

/**
 * Flush out validator messages with all details
 */
export const wrapValidatorOutput = (
  output: ValidatorOutput,
  defaultLocation: string,
  defaultLevel: FieldMessageType
): MessageAtLocation | undefined => {
  if (output === undefined || output === '') return undefined
  if (typeof output === 'string') {
    const cutPos = output.indexOf(':')
    if (cutPos !== -1) {
      const signature = output.substring(0, cutPos)
      if (!signature.includes(' ')) {
        return {
          signature,
          text: output.substring(cutPos + 1).trim(),
          type: defaultLevel,
          location: defaultLocation,
        }
      }
    }
    return {
      text: output,
      type: defaultLevel,
      location: defaultLocation,
    }
  } else {
    const report = output as MessageMaybeAtLocation
    return {
      ...report,
      type: report.type ?? 'error',
      location: report.location ?? defaultLocation,
    }
  }
}

/**
 * Messages for all different parts of input data
 */
export type AllMessages = Record<string, FieldMessage[]>

/**
 * Interface for long-running validator functions
 */
export type ValidatorControls = {
  isStillFresh?: () => boolean
  updateStatus: (status: { message?: MarkdownCode; progress?: number }) => void
}

type NumberStringFunction = (amount: number) => string
export type NumberMessageTemplate = string | NumberStringFunction

export const getNumberMessage = (template: NumberMessageTemplate, amount: number): string =>
  typeof template === 'string' ? (template as string) : (template as NumberStringFunction)(amount)

type DateStringFunction = (date: Date) => string
export type DateMessageTemplate = string | DateStringFunction

export const getDateMessage = (template: DateMessageTemplate, date: Date): string =>
  typeof template === 'string' ? (template as string) : (template as DateStringFunction)(date)

/**
 * Types for validator functions
 */

/**
 * A synchronous validator function
 *
 * It should return undefined if everything is fine,
 * or return the found issues.
 */
export type SyncValidatorFunction<DataType> = (
  value: DataType,
  controls: ValidatorControls,
  reason: string
) => SingleOrArray<ValidatorOutput>

/**
 * An asynchronous validator function
 *
 * It should return undefined if everything is fine,
 * or return the found issues.
 */
export type AsyncValidatorFunction<DataType> = (
  value: DataType,
  controls: ValidatorControls,
  reason: string
) => Promise<SingleOrArray<ValidatorOutput>>

export type ValidatorFunction<DataType> = SyncValidatorFunction<DataType> | AsyncValidatorFunction<DataType>
