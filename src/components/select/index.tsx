import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { cn } from '../../lib/utils'

export type SelectOption = {
  label: string
  value: string
}

export type SelectProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  handleChange?: (value: string) => void
  label?: string
  options: SelectOption[]
  placeholder?: string
  value?: string
}

export const Select = ({
  className,
  defaultValue,
  disabled = false,
  handleChange,
  label,
  options,
  placeholder = 'Select an option',
  value,
}: SelectProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <BaseSelect value={value} onValueChange={handleChange} defaultValue={defaultValue} disabled={disabled}>
        <SelectTrigger className="text-foreground font-medium data-[size=default]:h-10 w-full bg-background focus-visible:ring-ring/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </BaseSelect>
    </div>
  )
}
