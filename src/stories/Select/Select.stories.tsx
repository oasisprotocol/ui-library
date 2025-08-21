import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '../../components/select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'rofl_create', label: 'ROFL Create' },
  { value: 'rofl_register', label: 'ROFL Register' },
  { value: 'rofl_remove', label: 'ROFL Remove' },
  { value: 'rofl_update', label: 'ROFL Update' },
]

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select type',
  },
}
