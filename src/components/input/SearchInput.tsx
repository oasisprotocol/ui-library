import { FC, useEffect, useState, ReactNode, FocusEvent, KeyboardEvent } from 'react'
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
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  size?: 'default' | 'lg'
  value: string
  hint?: ReactNode
  warning?: ReactNode
}

export const SearchInput: FC<SearchInputProps> = ({
  autoFocus,
  className,
  hint,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  size,
  value,
  warning,
}) => {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (hint || warning) {
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setShowHint(false)
    }
  }, [hint, warning])

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
            onFocus={onFocus}
            onBlur={onBlur}
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
        className="p-2 text-xs items-center"
        side="bottom"
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          {warning && (
            <div className="flex gap-2 text-warning">
              <TriangleAlert className="h-5 w-5 min-w-5" />
              {warning}
            </div>
          )}
          {hint && <div className="text-muted-foreground">{hint}</div>}
        </div>
      </PopoverContent>
    </Popover>
  )
}
