import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch.tsx'
import { Label } from '@/components/ui/label.tsx'
import { expect, within, userEvent } from 'storybook/test'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=60-438&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')
    await expect(switchElement).toBeInTheDocument()
    await userEvent.click(switchElement)
    await expect(switchElement).toHaveAttribute('aria-checked', 'false')
  },
}

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <div className="flex items-center space-x-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
      <p className="text-muted-foreground text-sm">
        You will receive notifications when someone mentions you or replies to your messages.
      </p>
    </div>
  ),
}
