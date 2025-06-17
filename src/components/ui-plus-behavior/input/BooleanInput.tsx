import { FC } from 'react'
import { BooleanFieldControls } from './useBoolField'

import { WithVisibility } from './WithVisibility'
import { WithValidation } from './WithValidation'
import { MaybeWithTooltip } from '../tooltip'
import { cn } from '../../../lib'
import { Checkbox } from '../../ui/checkbox'
import { Label } from '../../ui/label'
import { Info } from 'lucide-react'
import { Switch } from '../../ui/switch.tsx'
import { MarkdownBlock } from '../../ui/markdown.tsx'

export const BooleanInput: FC<BooleanFieldControls> = props => {
  const { name, description, label, value, setValue, allMessages, enabled, whyDisabled, preferredWidget } =
    props

  const renderedLabel = (
    <Label htmlFor={name} className={enabled ? undefined : 'text-muted-foreground'}>
      <MarkdownBlock code={label} />
      {(description || !enabled) && <Info size="1em" />}
    </Label>
  )

  return (
    <WithVisibility field={props}>
      <WithValidation field={props} messages={allMessages.root}>
        <MaybeWithTooltip overlay={whyDisabled ?? description}>
          <div
            className={cn(
              'flex items-center space-x-2'
              // enabled ? classes.pointer : classes.disabled
            )}
          >
            {preferredWidget === 'checkbox' && (
              <>
                <Checkbox id={name} checked={value} onCheckedChange={setValue} disabled={!enabled} />
                {renderedLabel}
              </>
            )}
            {preferredWidget === 'switch' && (
              <>
                {renderedLabel}
                <Switch id={name} checked={value} onCheckedChange={setValue} disabled={!enabled} />
              </>
            )}
          </div>
        </MaybeWithTooltip>
      </WithValidation>
    </WithVisibility>
  )
}
