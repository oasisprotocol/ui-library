import { MarkdownCode } from '../../ui/markdown'

export type Timeout = ReturnType<typeof setTimeout>

export type ExecutionContext = {
  setStatus: (message: MarkdownCode | undefined) => void
  log: (message: MarkdownCode, ...optionalParams: any[]) => void
  warn: (message: MarkdownCode, ...optionalParams: any[]) => void
  error: (message: MarkdownCode, ...optionalParams: any[]) => void
}

export const basicExecutionContext: ExecutionContext = {
  setStatus: () => undefined,
  log: console.log,
  warn: console.warn,
  error: console.error,
}
