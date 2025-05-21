import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component: 'A set of two-state buttons that can be toggled on or off.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=123-75&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    defaultValue: 'bold',
    variant: 'default',
  },
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['default', 'outline', 'ghost'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const boldButton = canvas.getByLabelText('Bold')
    const italicButton = canvas.getByLabelText('Italic')
    await expect(boldButton).toBeInTheDocument()
    await expect(italicButton).toBeInTheDocument()
    await expect(boldButton).toHaveAttribute('data-state', 'on')
  },
}
