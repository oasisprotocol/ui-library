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
  const beforeStartDecorationRef = useRef<HTMLSpanElement>(null)
  const [beforeStartDecorationWidth, setBeforeStartDecorationWidth] = useState<number>(0)
  const startDecorationRef = useRef<HTMLSpanElement>(null)
  const [startDecorationWidth, setStartDecorationWidth] = useState<number>(0)
  const endDecorationRef = useRef<HTMLSpanElement>(null)
  const [endDecorationWidth, setEndDecorationWidth] = useState<number>(0)
  const afterEndDecorationRef = useRef<HTMLSpanElement>(null)
  const [afterEndDecorationWidth, setAfterEndDecorationWidth] = useState<number>(0)

  useEffect(() => {
    if (!!beforeStartDecoration && !!beforeStartDecorationRef.current) {
      const rect = beforeStartDecorationRef.current.getBoundingClientRect()
      setBeforeStartDecorationWidth(rect.width)
    } else {
      setBeforeStartDecorationWidth(0)
    }
  }, [beforeStartDecoration, beforeStartDecorationRef.current])

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

  useEffect(() => {
    if (!!afterEndDecoration && !!afterEndDecorationRef.current) {
      const rect = afterEndDecorationRef.current.getBoundingClientRect()
      setAfterEndDecorationWidth(rect.width)
    } else {
      setAfterEndDecorationWidth(0)
    }
  }, [afterEndDecoration, afterEndDecorationRef.current]) // Re-run if content changes

  const startDecoratorStyle = beforeStartDecorationWidth
    ? { paddingLeft: `${8 + beforeStartDecorationWidth}px` }
    : {}

  const startStyle =
    !!startDecorationWidth || beforeStartDecorationWidth
      ? { paddingLeft: `${16 + beforeStartDecorationWidth + startDecorationWidth}px` }
      : {}

  const endStyle =
    !!endDecorationWidth || !afterEndDecorationWidth
      ? { paddingRight: `${16 + endDecorationWidth + afterEndDecorationWidth}px` }
      : {}

  const endDecoratorStyle = afterEndDecorationWidth
    ? { paddingRight: `${8 + afterEndDecorationWidth}px` }
    : {}

  return (
    <>
      <div className={'relative'}>
        {!!beforeStartDecoration && (
          <span
            className={'absolute left-2.5 top-2.5 pr-2.5'}
            style={{ borderRight: '2px solid black' }}
            ref={beforeStartDecorationRef}
          >
            {beforeStartDecoration}
          </span>
        )}
        {!!startDecoration && (
          <span className={'absolute left-2.5 top-2.5'} style={startDecoratorStyle} ref={startDecorationRef}>
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
          <span className={'absolute right-2.5 top-2.5'} style={endDecoratorStyle} ref={endDecorationRef}>
            {endDecoration}
          </span>
        )}
        {!!afterEndDecoration && (
          <span
            className={'absolute right-2.5 top-2.5 pl-2.5'}
            style={{ borderLeft: '2px solid black' }}
            ref={afterEndDecorationRef}
          >
            {afterEndDecoration}
          </span>
        )}
      </div>
    </>
  )
}

export { Input }
