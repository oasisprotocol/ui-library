import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '../../components/alert'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Displays a callout for user attention.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=21-322&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'error', 'warning', 'error-filled', 'warning-filled'],
      description: 'The variant of the alert',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    sticky: {
      control: 'boolean',
      description: 'Makes the alert stick to the top of its container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    children: <>Alert description provides additional information about the alert.</>,
    variant: 'info',
    title: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole('alert')
    await expect(alert).toBeInTheDocument()
  },
}
