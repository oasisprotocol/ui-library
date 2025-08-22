import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog.tsx'
import { Button } from '../../components/ui/button.tsx'
import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import { ImagePreviewDialog } from '../../components/dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=112-477&p=f&t=uuwNBOkjxCfoISCP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultDialog() {
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sample Dialog</DialogTitle>
            <DialogDescription>Sample description text goes here.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Open Dialog' })[0]
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    const dialog = document.querySelector('[role="dialog"]')
    await expect(dialog).toBeInTheDocument()
  },
}

export const ControlledDialog: Story = {
  render: function ControlledDialogExample() {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <p className="text-sm text-muted-foreground">Dialog is {open ? 'open' : 'closed'}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>This dialog is controlled programmatically.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}

export const AlertDialog: Story = {
  render: function AlertDialogExample() {
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data
              from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Delete Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const LongDialog: Story = {
  render: function LongDialogExample() {
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Open Long Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sample Dialog</DialogTitle>
            <DialogDescription>
              {Array.from({length: 100}).map((_v, i) =>
                <p key={i}>Sample description text goes here.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const ImagePreview: Story = {
  render: function ImagePreviewDialogExample() {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Image Preview</Button>
        <ImagePreviewDialog
          src="https://explorer.dev.oasis.io/Oasis%20Explorer%20-%20OpenGraph%20Banner.png"
          title="Oasis Network"
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    )
  },
}
