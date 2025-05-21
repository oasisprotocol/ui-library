import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'
import { InfoIcon } from 'lucide-react'
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <InfoIcon />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Alert description provides additional information about the alert.
        </AlertDescription>
      </>
    ),
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = canvas.getByRole('alert')
    await expect(alert).toBeInTheDocument()
  },
}
