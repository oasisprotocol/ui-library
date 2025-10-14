import React, { FC, useEffect, useState } from 'react'
import { Search, X, TriangleAlert } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '../../lib/utils'

type SearchInputProps = {
  autoFocus?: boolean
  className?: string
  placeholder?: string
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  size?: 'default' | 'lg'
  value: string
  hint?: string
}

export const SearchInput: FC<SearchInputProps> = ({
  autoFocus,
  className,
  hint,
  onChange,
  onKeyDown,
  placeholder,
  size,
  value,
}) => {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (hint) {
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setShowHint(false)
    }
  }, [hint])

  return (
    <Popover open={showHint}>
      <PopoverTrigger asChild>
        <div role="search" className={cn('relative w-full', className)}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            aria-label="Search"
            autoComplete="off"
            autoFocus={autoFocus}
            className={cn('text-sm pl-10 pr-10 bg-background', size === 'lg' ? 'h-10' : 'h-9')}
            onChange={event => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder ?? 'Search'}
            spellCheck={false}
            type="text"
            value={value}
          />

          {value && (
            <Button
              aria-label="Clear search"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => onChange('')}
              size="icon"
              type="button"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: 'var(--radix-popover-trigger-width)' }}
        className="p-2 flex gap-2 text-warning text-xs items-center"
        side="bottom"
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <TriangleAlert className="h-5 w-5 min-w-5" />
        {hint}
      </PopoverContent>
    </Popover>
  )
}
