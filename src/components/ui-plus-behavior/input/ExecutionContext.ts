import { MarkdownCode } from '../../ui/markdown'

export type Timeout = ReturnType<typeof setTimeout>

export type ExecutionContext = {
  setStatus: (message: MarkdownCode | undefined) => void
  log: (message: MarkdownCode | unknown, ...optionalParams: unknown[]) => void
  warn: (message: MarkdownCode | unknown, ...optionalParams: unknown[]) => void
  error: (message: MarkdownCode | unknown, ...optionalParams: unknown[]) => void
}

export const basicExecutionContext: ExecutionContext = {
  setStatus: () => undefined,
  log: console.log,
  warn: console.warn,
  error: console.error,
}
