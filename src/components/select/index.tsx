import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { cn } from '../../lib/utils'

export type SelectOption<T = string> = {
  label: string
  value: T
}

export type SelectProps<T = string> = {
  className?: string
  defaultValue?: T
  disabled?: boolean
  handleChange?: (value: T) => void
  label?: string
  options?: SelectOption<T>[]
  placeholder?: string
  value?: T
}

// Avoid throwing an error if <Select.Item /> has an empty string value.
// https://github.com/radix-ui/primitives/blob/main/packages/react/select/src/select.tsx#L1277
const EMPTY_VALUE_PLACEHOLDER = '__empty__'

export const Select = <T extends string = string>({
  className,
  defaultValue,
  disabled = false,
  handleChange,
  label,
  options = [],
  placeholder = 'Select an option',
  value,
}: SelectProps<T>) => {
  const normalizeValue = (val: T | undefined) => {
    if (val === '') return EMPTY_VALUE_PLACEHOLDER
    return val
  }

  const denormalizeValue = (val: string): T => {
    if (val === EMPTY_VALUE_PLACEHOLDER) return '' as T
    return val as T
  }

  const handleValueChange = (newValue: string) => {
    if (handleChange) {
      handleChange(denormalizeValue(newValue))
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <BaseSelect
        value={normalizeValue(value)}
        onValueChange={handleValueChange}
        defaultValue={normalizeValue(defaultValue)}
        disabled={disabled}
      >
        <SelectTrigger className="text-foreground font-medium data-[size=default]:h-10 w-full bg-background focus-visible:ring-ring/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => {
            const itemValue = option.value === '' ? EMPTY_VALUE_PLACEHOLDER : String(option.value)
            return (
              <SelectItem key={itemValue} value={itemValue}>
                {option.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </BaseSelect>
    </div>
  )
}
