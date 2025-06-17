import { FC, MouseEventHandler } from 'react'
import { ActionControls } from './useAction'
import { WithVisibility } from './WithVisibility'
import { WithValidation } from './WithValidation'

import { MaybeWithTooltip } from '../tooltip'
import { Button } from '../../ui/button.tsx'
import { MarkdownBlock } from '../../ui/markdown.tsx'
import { LoaderCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog.tsx'

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
          <MaybeWithTooltip overlay={whyDisabled ?? description} side={'top'}>
            <Button
              variant={variant}
              size={size}
              color={color}
              onClick={handleClick}
              disabled={!enabled || isPending}
            >
              {isPending && <LoaderCircle size="1em" className="rotating" />}
              <MarkdownBlock code={label} />
            </Button>
          </MaybeWithTooltip>
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
            <Button variant="outline" onClick={onConfirmationDenied}>
              <MarkdownBlock code={confirmationNeeded?.cancelLabel} />
            </Button>
            <Button onClick={onConfirmationProvided} variant={confirmationNeeded?.variant}>
              <MarkdownBlock code={confirmationNeeded?.okLabel} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
