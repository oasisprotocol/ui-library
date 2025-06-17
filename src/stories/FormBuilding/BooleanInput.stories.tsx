import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { BooleanInput, deny, InputFieldGroup, useBooleanField } from '../../components/ui-plus-behavior/input'

const meta: Meta<typeof BooleanInput> = {
  title: 'ui-plus-behavior/useBooleanField() and <BooleanInput>',
  component: BooleanInput,
  parameters: {
    docs: {
      description: {
        component: 'A controlled boolean input field with built-in behaviors.',
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
    // Configuration for the tested component
    const visible = useBooleanField({
      name: 'visible',
      initialValue: true,
    })
    const enabled = useBooleanField({
      name: 'enabled',
      initialValue: true,
    })
    const hasDescription = useBooleanField({
      name: 'hasDescription',
      label: 'Has description',
      initialValue: false,
    })

    // Model for the boolean input
    const field = useBooleanField({
      name: 'test bool input',

      // Applying the configuration from above
      description: hasDescription.value ? 'Just some **stuff** we want to check' : undefined,
      visible: visible.value,
      enabled: enabled.value ? true : deny('Currently disabled, see checkbox above'),
    })

    return (
      <div className={'w-[400px]'}>
        <h2>Configuration</h2>
        <br />
        <InputFieldGroup fields={[visible, enabled, hasDescription]} />
        <h2>Test component</h2>
        <br />
        <BooleanInput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test input' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const SwitchWidget: Story = {
  render: function Example() {
    // Configuration for the tested component
    const visible = useBooleanField({
      name: 'visible',
      initialValue: true,
    })
    const enabled = useBooleanField({
      name: 'enabled',
      initialValue: true,
    })

    const hasDescription = useBooleanField({
      name: 'has description',
      initialValue: false,
    })

    // Model for the boolean input
    const field = useBooleanField({
      name: 'test bool input',

      // Applying the configuration from above
      preferredWidget: 'switch',
      description: hasDescription.value ? 'Just some stuff we want to check' : undefined,
      visible: visible.value,
      enabled: enabled.value ? true : deny('Currently disabled, see checkbox above'),
    })

    return (
      <div className={'w-[400px]'}>
        <h2>Configuration</h2>
        <br />
        <InputFieldGroup fields={[visible, enabled, hasDescription]} />
        <h2>Test component</h2>
        <br />
        <BooleanInput {...field} /> {/* This is our component */}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test input' })[0]
    await expect(button).toBeInTheDocument()
  },
}
