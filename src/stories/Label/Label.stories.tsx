import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../../components/ui/label.tsx'
import { Input } from '../../components/ui/input.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'Renders an accessible label associated with controls.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=65-517&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email',
  },
  decorators: [
    Story => (
      <div className="grid w-full max-w-sm items-center gap-1.5 group">
        <Story />
        <Input type="email" id="email" placeholder="Email" />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Email')
    await expect(label).toBeInTheDocument()
  },
}

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5 group">
      <Label htmlFor="username" className="after:text-destructive after:content-['*']">
        Username
      </Label>
      <Input type="text" id="username" placeholder="Username" required />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5 group" data-disabled="true">
      <Label htmlFor="disabled">Disabled Label</Label>
      <Input type="text" id="disabled" placeholder="Disabled input" disabled />
    </div>
  ),
}
