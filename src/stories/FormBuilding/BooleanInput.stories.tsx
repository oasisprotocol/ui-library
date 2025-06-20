import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { BooleanInput, deny, useBooleanField } from '../../components/ui-plus-behavior/input'
import { FC } from 'react'

import { screen } from 'storybook/test'

const BooleanInputTest: FC<Parameters<typeof useBooleanField>[0]> = props => {
  const controls = useBooleanField(props)
  return <BooleanInput {...controls} />
}

const meta: Meta<typeof BooleanInputTest> = {
  title: 'ui-plus-behavior/useBooleanField() and <BooleanInput>',
  component: BooleanInputTest,
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
  args: {
    name: 'testBooleanInput',
  },

  play: async ({ canvas, canvasElement }) => {
    // Checkbox is rendered, with label and button
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    const button = canvas.getByLabelText('Test boolean input')
    await expect(button).toBeInTheDocument()

    // We should be able to find the button based on the label
    // await expect(canvas.getByLabelText('Test boolean input', { selector: 'input' })).toBe(button)
    // Unfortunately, this doesn't work, because button is a non-labelable component per specification/
    // Still shadcn (radix ui) insists on using it this way. Clicking works, but accessibility doesn't
    // I have also added aria-labelledby to mitigate, but it's still not enough for this test case to work.

    // Checkbox is not checked by default
    await expect(button).not.toBeChecked()

    // We can check and uncheck it by clicking on the button
    await userEvent.click(button, { delay: 100 })
    await expect(button).toBeChecked()
    await userEvent.click(button, { delay: 100 })
    await expect(button).not.toBeChecked()

    // We can also check and uncheck it by clicking on the label
    await userEvent.click(label!, { delay: 100 })
    await expect(button).toBeChecked()
    await userEvent.click(label!, { delay: 100 })
    await expect(button).not.toBeChecked()
  },
}

export const OnByDefault: Story = {
  args: {
    name: 'testBooleanInput',
    initialValue: true,
  },

  play: async ({ canvas, canvasElement }) => {
    // Checkbox is rendered, with label and button
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    const button = canvas.getByLabelText('Test boolean input')
    await expect(button).toBeInTheDocument()

    // Checkbox is checked by default
    await expect(button).toBeChecked()
  },
}

export const WithDescription: Story = {
  args: {
    name: 'testBooleanInput',
    description: 'For testing, you know',
  },

  play: async ({ canvas, canvasElement }) => {
    // Checkbox is rendered, with label and button
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    const button = canvas.getByLabelText('Test boolean input')
    await expect(button).toBeInTheDocument()

    // Should show an info icon
    const infoIcon = canvasElement.querySelector('.lucide-info')
    await expect(infoIcon).toBeInTheDocument()

    // Hovering should bring up the tooltip, with the formatted markdown
    await userEvent.hover(label!, { delay: 500 })
    const tooltip = screen.getByRole('tooltip')
    await expect(tooltip).toHaveTextContent('For testing, you know')
  },
}

export const Disabled: Story = {
  args: {
    name: 'testBooleanInput',
    enabled: deny("You can't check this for reasons"),
  },

  play: async ({ canvas, canvasElement }) => {
    // Checkbox is rendered, with label and button
    const label = canvasElement.querySelector('[data-slot="label"]')
    await expect(label).toBeInTheDocument()
    const button = canvas.getByLabelText('Test boolean input')
    await expect(button).toBeInTheDocument()

    // Should show an info icon
    const infoIcon = canvasElement.querySelector('.lucide-info')
    await expect(infoIcon).toBeInTheDocument()

    // Hovering should bring up the tooltip, with the formatted markdown
    await userEvent.hover(label!, { delay: 250 })
    const tooltip = screen.getByRole('tooltip')
    await expect(tooltip).toHaveTextContent("You can't check this for reasons")

    // Clicking won't check it
    await expect(button).not.toBeChecked()
    await userEvent.click(button, { delay: 250 })
    await expect(button).not.toBeChecked()
    await userEvent.click(label!, { delay: 250 })
    await expect(button).not.toBeChecked()
  },
}

export const DefaultSwitch: Story = {
  args: {
    name: 'testBooleanInput',
    preferredWidget: 'switch',
  },

  play: Default.play,
}

export const OnByDefaultSwitch: Story = {
  args: {
    name: 'testBooleanInput',
    initialValue: true,
    preferredWidget: 'switch',
  },

  play: OnByDefault.play,
}

export const SwitchWithDescription: Story = {
  args: {
    name: 'testBooleanInput',
    description: 'For testing, you know',
    preferredWidget: 'switch',
  },

  play: WithDescription.play,
}

export const DisabledSwitch: Story = {
  args: {
    name: 'testBooleanInput',
    enabled: deny("You can't check this for reasons"),
    preferredWidget: 'switch',
  },

  play: Disabled.play,
}
