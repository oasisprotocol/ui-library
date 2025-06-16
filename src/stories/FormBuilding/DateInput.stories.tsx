import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { DateInput, useDateField } from '../../components/ui-plus-behavior/input'

const meta: Meta<typeof DateInput> = {
  title: 'ui-plus-behavior/useDateField() and <DateInput>',
  component: DateInput,
  parameters: {
    docs: {
      description: {
        component: 'A controlled date input field with built-in behaviors.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    // Model for the boolean input
    const date = useDateField({
      name: 'testDateInput',
      label: 'Test date',
      description: 'Some interesting date',
      // validators: () => 'oops',
      validateOnChange: true,
    })

    return (
      <div className={'w-[400px]'}>
        <DateInput {...date} />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test input' })[0]
    await expect(button).toBeInTheDocument()
  },
}
