import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { expect, within, userEvent } from 'storybook/test'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Displays a list of options for the user to pick from—triggered by a button.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=118-1264&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: '',
  },
  render: args => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="rofl_create">ROFL Create</SelectItem>
          <SelectItem value="rofl_register">ROFL Register</SelectItem>
          <SelectItem value="rofl_remove">ROFL Remove</SelectItem>
          <SelectItem value="rofl_update">ROFL Update</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectTrigger = canvas.getByRole('combobox')
    await expect(selectTrigger).toBeInTheDocument()
    await userEvent.click(selectTrigger)
    const options = document.querySelectorAll('[role="option"]')
    await expect(options).toBeTruthy()
  },
}
