import { FC, PropsWithChildren } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InputFieldControls } from './useInputField.ts'
import { MotionDiv } from '../Animations'
import { cn } from '../../../lib'

export const WithVisibility: FC<
  PropsWithChildren<{
    field: Pick<InputFieldControls<unknown>, 'visible' | 'containerClassName' | 'expandHorizontally' | 'name'>
    padding?: boolean
  }>
> = props => {
  const { field, children, padding = true } = props
  const { visible, containerClassName, expandHorizontally } = field

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <MotionDiv
          reason={'conditionalField'}
          layout
          key={field.name}
          className={cn('overflow-x-hidden', expandHorizontally ? 'w-full' : undefined, containerClassName)}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            // duration: 2,
            ease: 'easeInOut',
          }}
        >
          {children}
          {padding && <div key="padding" className={'h-[1em]'} />}
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
