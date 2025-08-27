import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { LabelOutput, LabelProps, useLabel } from '../../components/ui-plus-behavior/input'
import { FC } from 'react'

const TestLabel: FC<LabelProps> = props => {
  const controls = useLabel(props)
  return <LabelOutput {...controls} />
}

const meta: Meta<typeof TestLabel> = {
  title: 'ui-plus-behavior/useLabel() and <LabelOutput>',
  component: TestLabel,
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
  args: {
    name: 'testLabel',
    value: 'Test label (with _formatted_ content)',
  },

  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    await expect(label).toContainHTML('Test label (with <em>formatted</em> content')
  },
}

export const WithDescription: Story = {
  args: {
    name: 'testLabel',
    value: Default.args!.value,
    description: 'Description (_also formatted_)',
  },

  play: async ({ canvasElement }) => {
    // We should see the label normally
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    await expect(label).toContainHTML('Test label (with <em>formatted</em> content')

    // Also check the description
    const desc = canvasElement.querySelector('[data-slot="description"]')
    await expect(desc).toContainHTML('Description (<em>also formatted</em>)')
  },
}

export const WithError: Story = {
  args: {
    name: 'testLabel',
    value: 'Test label (which can be _formatted_)',
    validateOnChange: true,
    validators: () => 'There is a problem',
  },
  play: async ({ canvas }) => {
    // Wait for error message to appear
    await waitFor(async () => {
      const error = canvas.getByRole('field-error')
      await expect(error).toHaveTextContent('There is a problem')
    })
  },
}

export const WithWarning: Story = {
  args: {
    name: 'testLabel',
    value: 'Test label (which can be _formatted_)',

    validateOnChange: true,
    validators: () => ({ type: 'warning', text: 'There might be a problem' }),
  },
  play: async ({ canvas }) => {
    // Wait for warning message to appear
    await waitFor(async () => {
      const error = canvas.getByRole('field-warning')
      await expect(error).toHaveTextContent('There might be a problem')
    })
  },
}

export const WithCustomRenderer: Story = {
  args: {
    name: 'textLabel',
    value: 'apple',
    renderer: value =>
      value === 'apple' ? (
        <span>
          Yes, we <em>do</em> like apple pie.
        </span>
      ) : (
        <span>
          <strong>Well I wanted an apple.</strong> I don't know about this.
        </span>
      ),
  },

  play: async ({ canvasElement }) => {
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    await expect(label).toContainHTML('Yes, we <em>do</em> like apple')
  },
}
