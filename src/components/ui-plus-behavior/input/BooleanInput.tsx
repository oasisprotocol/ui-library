import { FC } from 'react'
import { BooleanFieldControls } from './useBoolField'

import { WithVisibility } from './WithVisibility'
import { WithValidation } from './WithValidation'
import { WithTooltip } from '../tooltip'
import { cn } from '../../../lib'
import { Checkbox } from '../../ui/checkbox'
import { Label } from '../../ui/label'
import { Info } from 'lucide-react'
import { Switch } from '../../ui/switch.tsx'
import { MarkdownBlock } from '../../ui/markdown.tsx'

export const BooleanInput: FC<BooleanFieldControls> = props => {
  const { id, description, label, value, setValue, allMessages, enabled, whyDisabled, preferredWidget } =
    props

  const labelId = `${id}-label`

  return (
    <WithVisibility field={props}>
      <WithValidation field={props} messages={allMessages.root}>
        <WithTooltip overlay={whyDisabled ?? description}>
          <div
            className={cn(
              'flex items-center space-x-2'
              // enabled ? classes.pointer : classes.disabled
            )}
          >
            {preferredWidget === 'checkbox' && (
              <>
                <Checkbox
                  id={id}
                  aria-labelledby={labelId}
                  aria-label={label?.toString()}
                  checked={value}
                  onCheckedChange={setValue}
                  disabled={!enabled}
                />
                <Label htmlFor={id} id={labelId} className={enabled ? undefined : 'text-muted-foreground'}>
                  <MarkdownBlock code={label} mainTag={'span'} />
                  {(description || !enabled) && <Info size="1em" />}
                </Label>
              </>
            )}
            {preferredWidget === 'switch' && (
              <>
                <Label
                  htmlFor={id}
                  id={`${id}-label`}
                  className={enabled ? undefined : 'text-muted-foreground'}
                >
                  <MarkdownBlock code={label} mainTag={'span'} />
                  {(description || !enabled) && <Info size="1em" />}
                </Label>
                <Switch
                  id={id}
                  aria-labelledby={labelId}
                  checked={value}
                  onCheckedChange={setValue}
                  disabled={!enabled}
                />
              </>
            )}
          </div>
        </WithTooltip>
      </WithValidation>
    </WithVisibility>
  )
}
