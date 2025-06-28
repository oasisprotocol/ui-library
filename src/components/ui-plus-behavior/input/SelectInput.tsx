import { FC, useState } from 'react'
import { OneOfFieldControls } from './useOneOfField'
import { checkMessagesForProblems, getReasonForDenial, getVerdict } from './util'
import { WithVisibility } from './WithVisibility.tsx'
import { WithLabelAndDescription } from './WithLabelAndDescription'
import { WithValidation } from './WithValidation'
import { WithTooltip } from '../tooltip'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select.tsx'
import { MarkdownBlock } from '../../ui/markdown.tsx'
import { Info } from 'lucide-react'

export const SelectInput: FC<Omit<OneOfFieldControls, 'value' | 'cleanValue' | 'setValue'>> = props => {
  const { choices, allMessages, renderValue, setRenderValue, enabled, whyDisabled } = props
  const [isOpen, setIsOpen] = useState(false)

  const { hasError } = checkMessagesForProblems(allMessages.root)

  return (
    <WithVisibility field={props}>
      <WithLabelAndDescription field={props}>
        <WithValidation field={props} messages={allMessages.root}>
          <WithTooltip overlay={whyDisabled}>
            <Select
              disabled={!enabled}
              value={renderValue}
              onValueChange={setRenderValue}
              onOpenChange={setIsOpen}
            >
              <SelectTrigger className="w-full" aria-invalid={hasError}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {choices
                    .filter(c => !c.hidden)
                    .map(choice => {
                      const disabled = !getVerdict(choice.enabled, true)
                      return (
                        <WithTooltip
                          overlay={(getReasonForDenial(choice.enabled) as string) ?? choice.description}
                          side={'left'}
                        >
                          <SelectItem value={choice.value} disabled={disabled} className={'w-full'}>
                            <MarkdownBlock code={choice.label} className={choice.className} />
                            {isOpen && (disabled || choice.description) ? <Info size={'1em'} /> : ''}
                          </SelectItem>
                        </WithTooltip>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </WithTooltip>
        </WithValidation>
      </WithLabelAndDescription>
    </WithVisibility>
  )
}
