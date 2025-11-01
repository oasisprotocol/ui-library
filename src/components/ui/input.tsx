import * as React from 'react'

import { cn } from '../../lib/utils'
import { useEffect, useRef, useState } from 'react'

interface OwnProps {
  // Something that needs to appear before the start, outside the field
  beforeStartDecoration?: React.ReactNode

  // Something that needs to appear at the start, inside the field
  startDecoration?: React.ReactNode

  // Something that needs to appear at the end, inside the field
  endDecoration?: React.ReactNode

  // Something that needs to appear after the end, outside the field
  afterEndDecoration?: React.ReactNode
}

function Input({
  className,
  type,
  beforeStartDecoration,
  startDecoration,
  endDecoration,
  afterEndDecoration,
  ...props
}: React.ComponentProps<'input'> & OwnProps) {
  const startDecorationRef = useRef<HTMLSpanElement>(null)
  const [startDecorationWidth, setStartDecorationWidth] = useState<number>(0)
  const endDecorationRef = useRef<HTMLSpanElement>(null)
  const [endDecorationWidth, setEndDecorationWidth] = useState<number>(0)

  useEffect(() => {
    if (!!startDecoration && !!startDecorationRef.current) {
      const rect = startDecorationRef.current.getBoundingClientRect()
      setStartDecorationWidth(rect.width)
    } else {
      setStartDecorationWidth(0)
    }
  }, [startDecoration, startDecorationRef.current])

  useEffect(() => {
    if (!!endDecoration && !!endDecorationRef.current) {
      const rect = endDecorationRef.current.getBoundingClientRect()
      setEndDecorationWidth(rect.width)
    } else {
      setEndDecorationWidth(0)
    }
  }, [endDecoration, endDecorationRef.current]) // Re-run if content changes

  const startStyle = !!startDecorationWidth ? { paddingLeft: `${16 + startDecorationWidth}px` } : {}
  const endStyle = !!endDecorationWidth ? { paddingRight: `${16 + endDecorationWidth}px` } : {}

  // const hasInsideDecorations = !!startDecoration || !!endDecoration
  // const hasOutsideDecorations = !!beforeStartDecoration || !!afterEndDecoration
  return (
    <>
      {beforeStartDecoration}
      <div className={'relative'}>
        {!!startDecoration && (
          <span className={'absolute left-2.5 top-2.5'} ref={startDecorationRef}>
            {startDecoration}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className
          )}
          style={{ ...startStyle, ...endStyle }}
          {...props}
        />
        {!!endDecoration && (
          <span className={'absolute right-2.5 top-2.5'} ref={endDecorationRef}>
            {endDecoration}
          </span>
        )}
      </div>
      {afterEndDecoration}
    </>
  )
}

export { Input }
