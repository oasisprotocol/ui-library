import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from '../../components/ui/sonner.tsx'
import { Button } from '../../components/ui/button.tsx'
import { toast } from 'sonner'
import { expect, within, userEvent } from 'storybook/test'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toast',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: 'An opinionated toast component for React.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=118-2756&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('This is a toast notification', {
          description: 'Please confirm this action.',
          action: {
            label: 'Close',
            onClick: () => console.log('Action triggered'),
          },
        })
      }
    >
      Show Toast
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Show Toast' })
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(canvas.getByText('This is a toast notification')).toBeInTheDocument()
  },
}
