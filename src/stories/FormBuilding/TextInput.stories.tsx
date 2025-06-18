import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { useTextField, TextInput } from '../../components/ui-plus-behavior/input'

const meta: Meta<typeof TextInput> = {
  title: 'ui-plus-behavior/useTextField() and <TextInput>',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: 'A controlled text input field with various builtin behaviors.',
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
    const input = useTextField({
      name: 'test input',
      // label: 'Test **input**',
      description: 'What do we have _here_?',
      placeholder: 'Type whatever',
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const CompactMode: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'input',
      placeholder: 'Type whatever',
      compact: true,
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithAutoFocusAndOnEnter: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'testInput',
      label: 'Default **input**',
      autoFocus: true,
      onEnter: value => alert(`What do you want me to do with "${value}"?`),
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
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
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      description: 'What do we have _here_?',
      placeholder: 'Type whatever',
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
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
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      initialValue: 'oops',
      validateOnChange: true,
      validators: () => ({ type: 'warning', text: 'This _might_ be wrong.' }),
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithMinimumLength: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      validateOnChange: true,
      minLength: 5,
      initialValue: 'foo',
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithMinimumLengthWithCustomizedMessage: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      validateOnChange: true,
      minLength: [5, min => `too short, need at least ${min}`],
      initialValue: 'bar',
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithMaximumLength: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'testInput',
      validateOnChange: true,
      maxLength: 10,
      initialValue: 'too long text',
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithCustomValidators: Story = {
  render: function Example() {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      description: 'Try words separated by spaces or commas',
      validateOnChange: true,
      validators: [
        value => (value.includes(' ') ? 'No spaces, please' : undefined),
        value => (value.includes(',') ? 'No commas, please' : undefined),
      ],
    })

    return (
      <div className={'w-[400px]'}>
        <TextInput {...input} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('label', { name: 'Test label' })[0]
    await expect(button).toBeInTheDocument()
  },
}
