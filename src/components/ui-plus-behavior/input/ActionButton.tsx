import { FC, MouseEventHandler } from 'react'
import { ActionControls } from './useAction'
import { WithVisibility } from './WithVisibility'
import { WithValidation } from './WithValidation'

import { WithTooltip } from '../tooltip'
import { Button } from '../../ui/button.tsx'
import { MarkdownBlock } from '../../ui/markdown.tsx'
import { Info, LoaderCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog.tsx'
import { cn } from '../../../lib'

export const ActionButton: FC<ActionControls<unknown>> = props => {
  const {
    name,
    allMessages,
    size,
    color,
    variant,
    label,
    execute,
    enabled,
    whyDisabled,
    description,
    isPending,
    confirmationNeeded,
    onConfirmationProvided,
    onConfirmationDenied,
    className,
    expandHorizontally,
  } = props
  const handleClick: MouseEventHandler = event => {
    event.stopPropagation()
    execute().then(
      result => {
        if (result !== undefined) {
          console.log('Result on action button', name, ':', typeof result, result)
        }
      },
      error => {
        if (error.message === 'User canceled action') {
          // User didn't confirm, not an issue
        } else {
          console.log('Error on action button', name, ':', error)
        }
      }
    )
  }
  return (
    <>
      <WithVisibility field={props}>
        <WithValidation field={props} messages={allMessages.root}>
          <WithTooltip
            overlay={whyDisabled ?? description}
            side={'top'}
            className={expandHorizontally ? 'w-full' : undefined}
          >
            <Button
              className={cn(className, expandHorizontally ? 'w-full' : undefined)}
              variant={variant}
              size={size}
              color={color}
              onClick={handleClick}
              disabled={!enabled || isPending}
            >
              {isPending && <LoaderCircle size="1em" className="rotating" />}
              <MarkdownBlock code={label} mainTag={'span'} />
              {description && <Info />}
            </Button>
          </WithTooltip>
        </WithValidation>
      </WithVisibility>
      <Dialog
        open={!!confirmationNeeded}
        onOpenChange={open => {
          if (!open) onConfirmationDenied()
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <MarkdownBlock code={confirmationNeeded?.title} />
            </DialogTitle>
            <DialogDescription>
              <MarkdownBlock code={confirmationNeeded?.description} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onConfirmationDenied} testId={'cancel'}>
              <MarkdownBlock code={confirmationNeeded?.cancelLabel} mainTag={'span'} />
            </Button>
            <Button onClick={onConfirmationProvided} variant={confirmationNeeded?.variant} testId={'confirm'}>
              <MarkdownBlock code={confirmationNeeded?.okLabel} mainTag={'span'} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
