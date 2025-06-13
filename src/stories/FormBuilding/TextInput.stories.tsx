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
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      // description: 'What do we have _here_?',
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

export const WithAutoFocusAndOnEnter: Story = {
  render: () => {
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
  render: () => {
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

export const WithError: Story = {
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      initialValue: 'oops',
      validateOnChange: true,
      validators: () => 'This is _so_ wrong.',
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
  render: () => {
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
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      validateOnChange: true,
      minLength: 5,
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
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      validateOnChange: true,
      minLength: [5, min => `too short, need at least ${min}`],
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
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      validateOnChange: true,
      maxLength: 10,
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
  render: () => {
    const input = useTextField({
      name: 'testInput',
      label: 'Test **input**',
      description: 'Try writing something that has spaces or commas',
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
