import type { Meta, StoryObj } from '@storybook/react-vite'
import { useTextField, TextInput, TextFieldProps } from '../../components/ui-plus-behavior/input'
import { FC } from 'react'
import { expect, fn, userEvent, waitFor } from 'storybook/test'

const TextInputTest: FC<TextFieldProps> = props => {
  const controls = useTextField(props)
  return <TextInput {...controls} />
}

const meta: Meta<typeof TextInputTest> = {
  title: 'ui-plus-behavior/useTextField() and <TextInput>',
  component: TextInputTest,
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
  args: {
    name: 'testInput',
    description: 'What do we have _here_?',
    placeholder: 'Type whatever',
    onValueChange: fn(),
    onEnter: fn(),
  },
  play: async ({ args, canvas, canvasElement }) => {
    // The label should be visible
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    await expect(label).toHaveTextContent('Test input')

    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', { selector: 'input' })
    await expect(input).toBeInTheDocument()

    // The description should also be displayed
    const desc = canvasElement.querySelector('[data-slot="description"]')
    await expect(desc).toContainHTML('What do we have <em>here</em>?')

    // Placeholder should be displayed
    await expect(input).toHaveProperty('placeholder', 'Type whatever')

    // We should be able to type
    await userEvent.type(input, 'test data{enter}', { delay: 10 })

    // onValueChange should be called with the first half of the value
    await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith('test', expect.anything()))

    // onValueChange should be called with the full value
    await waitFor(() => expect(args.onValueChange).toHaveBeenCalledWith('test data', expect.anything()))

    // onEnter should be called with the full value
    await waitFor(() => expect(args.onEnter).toHaveBeenCalledWith('test data'))
  },
}

export const CompactMode: Story = {
  args: {
    name: 'input',
    placeholder: 'Type whatever',
    compact: true,
  },
}

export const WithAutoFocus: Story = {
  args: {
    name: 'defaultInput',
    autoFocus: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Default input', { selector: 'input' })
    await expect(input).toBeInTheDocument()
    await expect(input).toHaveFocus()
  },
}

export const WithWarning: Story = {
  args: {
    name: 'testInput',
    description: 'Type anything to get a warning',
    label: 'Test **input**',
    validateOnChange: true,
    validators: () => ({ type: 'warning', text: 'This _might_ be wrong.' }),
  },
  play: async ({ canvas }) => {
    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', { selector: 'input' })
    await expect(input).toBeInTheDocument()

    // There should not be any warning message by default
    await expect(canvas.queryByRole('field-warning')).toBeNull()

    // We should be able to type
    await userEvent.type(input, 'anything', { delay: 10 })

    // Wait for warning message to appear
    await waitFor(async () => {
      const error = canvas.getByRole('field-warning')
      await expect(error).toHaveTextContent('This might be wrong')
    })
  },
}

export const WithMinimumLength: Story = {
  args: {
    name: 'testInput',
    description: 'Has a minimum length',
    validateOnChange: true,
    minLength: 5,
  },

  play: async ({ canvas }) => {
    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', {
      selector: 'input',
    })
    await expect(input).toBeInTheDocument()

    // There should not be any warning message by default
    await expect(canvas.queryByRole('field-error')).toBeNull()

    // We should be able to type
    await userEvent.type(input, 'cats', { delay: 10 })

    // Wait for the error message to appear
    await waitFor(() =>
      expect(canvas.getByRole('field-error')).toHaveTextContent(
        'Please specify at least 5 characters! (Currently: 4)'
      )
    )

    // We should be able to type
    await userEvent.type(input, ' and dogs', { delay: 10 })

    // The error message should disappear
    await waitFor(() => expect(canvas.queryByRole('field-error')).toBeNull())
  },
}

export const WithMinimumLengthWithCustomizedMessage: Story = {
  args: {
    name: 'testInput',
    description: 'Has a minimum length',
    validateOnChange: true,
    minLength: [5, min => `too short, need at least ${min}`],
  },
  play: async ({ canvas }) => {
    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', {
      selector: 'input',
    })

    // We should be able to type
    await userEvent.type(input, 'cats', { delay: 10 })

    // Wait for the error message to appear
    await waitFor(() =>
      expect(canvas.getByRole('field-error')).toHaveTextContent('too short, need at least 5 (Currently: 4)')
    )
  },
}

export const WithMaximumLength: Story = {
  args: {
    name: 'testInput',
    validateOnChange: true,
    maxLength: 10,
    // initialValue: 'too long text',
  },

  play: async ({ canvas }) => {
    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', {
      selector: 'input',
    })
    await expect(input).toBeInTheDocument()

    // There should not be any warning message by default
    await expect(canvas.queryByRole('field-error')).toBeNull()

    // We should be able to type
    await userEvent.type(input, 'Something long', { delay: 10 })

    // Wait for the error message to appear
    await waitFor(async () =>
      expect(canvas.getByRole('field-error')).toHaveTextContent(
        'Please specify at most 10 characters! (Currently: 14)'
      )
    )

    // We should be able to type
    await userEvent.type(input, '{Backspace}{Backspace}{Backspace}{Backspace}', { delay: 50 })

    // The error message should disappear
    await waitFor(() => expect(canvas.queryByRole('field-error')).toBeNull())
  },
}

export const WithCustomValidators: Story = {
  args: {
    name: 'testInput',
    description: 'Try words separated by spaces or commas',
    validateOnChange: true,
    validators: [
      value => (value.includes(' ') ? 'No spaces, please' : undefined),
      value => (value.includes(',') ? 'No commas, please' : undefined),
    ],
  },

  play: async ({ canvas }) => {
    // We should be able to find the input field based on the label
    const input = canvas.getByLabelText('Test input', {
      selector: 'input',
    })
    await expect(input).toBeInTheDocument()

    // There should not be any error message by default
    await expect(canvas.queryByRole('field-error')).toBeNull()

    // Let's input a test string with a space
    await userEvent.type(input, 'final solution', { delay: 10 })

    // Wait for the error message to appear
    await waitFor(() => expect(canvas.getByRole('field-error')).toHaveTextContent('No spaces, please'))

    // Delete old output
    await userEvent.type(input, '{Backspace}'.repeat(20))

    // Wait for the error message to disappear
    await waitFor(() => expect(canvas.queryByRole('field-error')).toBeNull())

    // Add new input
    await userEvent.type(input, 'One,Two')

    // Wait for the error message to appear
    await waitFor(() => expect(canvas.getByRole('field-error')).toHaveTextContent('No commas, please'))
  },
}
