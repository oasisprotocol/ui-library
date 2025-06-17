import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { LabelOutput, useLabel } from '../../components/ui-plus-behavior/input'

const meta: Meta<typeof LabelOutput> = {
  title: 'ui-plus-behavior/useLabel() and <LabelOutput>',
  component: LabelOutput,
  parameters: {
    docs: {
      description: {
        component:
          'A label, with the same rendering, validation and visibility configuration as all other form elements.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Example() {
    const field = useLabel({
      name: 'testLabel',
      value: 'Test label (with **formatted** content)',
    })

    return (
      <div className={'w-[400px]'}>
        <LabelOutput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithDescription: Story = {
  render: function Example() {
    const field = useLabel({
      name: 'testLabel',
      value: 'Test label (which can be _formatted_)',
      description: 'Description of the field (_also formatted_)',
    })

    return (
      <div className={'w-[400px]'}>
        <LabelOutput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithError: Story = {
  render: function Example() {
    const field = useLabel({
      name: 'testLabel',
      value: 'Test label (which can be _formatted_)',

      validateOnChange: true,
      validators: () => 'There is a problem',
    })

    return (
      <div className={'w-[400px]'}>
        <LabelOutput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithWarning: Story = {
  render: function Example() {
    const field = useLabel({
      name: 'testLabel',
      value: 'Test label (which can be _formatted_)',

      validateOnChange: true,
      validators: () => ({ type: 'warning', text: 'There might be a problem' }),
    })

    return (
      <div className={'w-[400px]'}>
        <LabelOutput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}
