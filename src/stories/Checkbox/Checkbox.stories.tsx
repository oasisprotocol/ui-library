import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { Label } from '@/components/ui/label.tsx'
import { expect, userEvent, within } from 'storybook/test'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=46-67&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function CheckboxWithLabel() {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')
    await expect(checkbox).toBeInTheDocument()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    id: 'checked',
  },
  render: function CheckedCheckbox(args) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox {...args} />
        <Label htmlFor="checked">Checked checkbox</Label>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'disabled',
  },
  render: function DisabledCheckbox(args) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox {...args} />
        <Label htmlFor="disabled" className="text-muted-foreground">
          Disabled checkbox
        </Label>
      </div>
    )
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    id: 'disabled-checked',
  },
  render: function DisabledCheckedCheckbox(args) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox {...args} />
        <Label htmlFor="disabled-checked" className="text-muted-foreground">
          Disabled checked checkbox
        </Label>
      </div>
    )
  },
}

export const WithDescription: Story = {
  render: function CheckboxWithDescription() {
    return (
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms1">Accept terms and conditions</Label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    )
  },
}
