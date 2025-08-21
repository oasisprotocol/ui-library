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
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <BaseSelect
        value={value as string}
        onValueChange={handleChange as ((value: string) => void) | undefined}
        defaultValue={defaultValue as string}
        disabled={disabled}
      >
        <SelectTrigger className="text-foreground font-medium data-[size=default]:h-10 w-full bg-background focus-visible:ring-ring/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </div>
  )
}
