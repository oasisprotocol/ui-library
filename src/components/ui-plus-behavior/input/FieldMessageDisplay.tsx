import { FC, ForwardedRef, forwardRef } from 'react'
import { FieldMessage, FieldMessageType } from './util'
import { AnimatePresence } from 'framer-motion'
import { MotionDiv } from '../Animations'
import { MarkdownBlock } from '../../ui/markdown'
import { cn } from '../../../lib'

const messageClass: Record<FieldMessageType, string> = {
  error: cn('pt-1', 'text-destructive'),
  warning: cn('pt-1', 'text-warning'),
  info: cn('pt-1'),
}

type Remover = (id: string) => void

export const FieldMessageDisplay: FC<{
  message: FieldMessage
  onRemove: Remover
}> = forwardRef(({ message, onRemove }, ref: ForwardedRef<HTMLDivElement>) => {
  // console.log('Displaying message', message)
  return (
    <MotionDiv
      reason={'fieldValidationErrors'}
      ref={ref}
      key={message.signature || (message.text as string)}
      // layout
      className={messageClass[message.type ?? 'error']}
      onClick={() => onRemove(message.text as string)}
      // initial={{ opacity: 0, y: '-50%' }}
      // animate={{ opacity: 1, x: 0, y: 0 }}
      // exit={{ opacity: 0, x: '+10%' }}
      initial={{ opacity: 0, height: 0, x: 50 }}
      animate={{ opacity: 1, height: 'auto', x: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      role={`field-${message.type}`}
    >
      <MarkdownBlock code={message.text} mainTag={'span'} />
    </MotionDiv>
  )
})

export const FieldMessageList: FC<{
  messages: FieldMessage[] | undefined
  onRemove: Remover
}> = ({ messages = [], onRemove }) => (
  <AnimatePresence mode={'sync'} initial={false}>
    {messages.map(p => (
      <FieldMessageDisplay key={p.signature ?? (p.text as string)} message={p} onRemove={onRemove} />
    ))}
  </AnimatePresence>
)
