import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge.tsx'
import { CircleCheckIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Displays a badge or a component that looks like a badge.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=23-995&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Badge')
    await expect(badge).toBeInTheDocument()
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <CircleCheckIcon />
        Verified
      </>
    ),
    variant: 'default',
  },
}
