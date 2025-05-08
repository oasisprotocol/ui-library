import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator.tsx'
import { expect } from 'storybook/test'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=118-2682&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    Story => (
      <>
        <h4 className="text-sm font-medium leading-none">Horizontal Separator</h4>
        <p className="text-sm text-muted-foreground">A horizontal line to separate content</p>
        <Story />
        <p className="text-sm text-muted-foreground">Content below</p>
      </>
    ),
  ],
  play: async ({ canvasElement }) => {
    const separator = canvasElement.querySelector('[data-slot="separator-root"]')
    await expect(separator).toBeInTheDocument()
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    Story => (
      <div className="flex h-32 items-center">
        <h4 className="text-sm font-medium leading-none">Left Content</h4>
        <Story />
        <h4 className="text-sm font-medium leading-none">Right Content</h4>
      </div>
    ),
  ],
}
