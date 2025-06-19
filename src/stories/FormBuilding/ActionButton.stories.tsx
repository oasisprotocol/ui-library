import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import {
  ActionButton,
  ActionProps,
  camelToTitleCase,
  deny,
  FullConfirmationRequest,
  sleep,
  useAction,
} from '../../components/ui-plus-behavior/input'
import { FC } from 'react'

import { screen } from 'storybook/test'

const ActionButtonTest: FC<ActionProps> = props => <ActionButton {...useAction(props)} />

const meta: Meta<typeof ActionButtonTest> = {
  title: 'ui-plus-behavior/useAction() and <ActionButton>',
  component: ActionButtonTest,
  args: {
    action: fn(),
  },
  parameters: {
    docs: {
      description: {
        component: 'A button with a coupled action, with optional description, pending and error statuses.',
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
    name: 'testAction',
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test action' })[0]
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.action).toBeCalled()
  },
}

export const CustomizedButton: Story = {
  args: {
    name: 'customizedAction',
    label: 'Customized **action button**',
    variant: 'destructive',
    size: 'lg',
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Customized action button' })[0]
    await expect(button).toContainHTML('<strong>action button</strong>')
  },
}

export const WithDescription: Story = {
  args: {
    name: 'actionWithDescription',
    description: 'There is a _description_ to this',
  },
  parameters: {
    docs: {
      description: {
        story: 'Try hovering the pointer',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Action with description' })[0]
    await expect(button).toBeInTheDocument()

    // Should show an info icon
    const infoIcon = canvasElement.querySelector('.lucide-info')
    await expect(infoIcon).toBeInTheDocument()

    // Hovering should bring up the tooltip, with the formatted markdown
    await userEvent.hover(button, { delay: 500 })
    const tooltip = screen.getByRole('tooltip')
    await expect(tooltip).toContainHTML('There is a <em>description</em> to this')
  },
}
export const WithConfirmation: Story = {
  args: {
    name: 'doSomethingWild',
    confirmationNeeded: true,
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Do something wild' })[0]
    await expect(button).toBeInTheDocument()

    // When clicked, dialog is shown
    await userEvent.click(button, { delay: 500 })

    let dialog = screen.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // We can cancel it, dialog disappears, no action
    const cancelButton = screen.getByTestId('cancel')
    await expect(cancelButton).toBeInTheDocument()
    await userEvent.click(cancelButton, { delay: 500 })
    await expect(dialog).not.toBeVisible()
    await expect(args.action).not.toBeCalled()

    // When clicked again, dialog is shown again
    await userEvent.click(button, { delay: 500 })
    dialog = screen.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // We can confirm it, dialog disappears, action is executed
    const continueButton = screen.getByTestId('confirm')
    await expect(continueButton).toBeInTheDocument()
    await userEvent.click(continueButton, { delay: 500 })
    await expect(dialog).not.toBeVisible()
    await expect(args.action).toBeCalled()
  },
}

export const WithCustomizedConfirmationQuestion: Story = {
  args: {
    name: 'doSomethingWild',
    confirmationNeeded: 'Have you considered the consequences?',
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Do something wild' })[0]
    await expect(button).toBeInTheDocument()

    // When clicked, dialog is shown
    await userEvent.click(button, { delay: 500 })

    let dialog = screen.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await expect(dialog).toContainHTML(args.confirmationNeeded as string)
  },
}

export const WithCustomizedConfirmationDialog: Story = {
  args: {
    name: 'doSomethingWild',
    confirmationNeeded: {
      title: 'Attention',
      description: 'Do you **really** want to do this?',
      cancelLabel: 'I would rather not',
      okLabel: 'LFG',
      variant: 'destructive',
    },
  },

  play: async ({ args, canvasElement }) => {
    const request = args.confirmationNeeded as FullConfirmationRequest
    const canvas = within(canvasElement)

    const button = canvas.getAllByRole('button', { name: 'Do something wild' })[0]
    await expect(button).toBeInTheDocument()

    // When clicked, dialog is shown
    await userEvent.click(button, { delay: 500 })
    let dialog = screen.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // The title, description and button labels are customized
    const title = document.querySelector('[data-slot="dialog-title"]')
    await expect(title).toHaveTextContent(request.title.toString())

    const description = document.querySelector('[data-slot="dialog-description"]')
    // Note the rendered Markdown formatting
    await expect(description).toContainHTML('Do you <strong>really</strong> want to do this?')

    const cancelButton = screen.getByTestId('cancel')
    await expect(cancelButton).toHaveTextContent(request.cancelLabel.toString())

    const confirmButton = screen.getByTestId('confirm')
    await expect(confirmButton).toHaveTextContent(request.okLabel.toString())
  },
}

const EXCUSE = "I'm sorry Dave, I'm afraid I can't do that."

export const Disabled: Story = {
  args: {
    name: 'disabledAction',
    label: 'Open the bay doors',
    enabled: deny(EXCUSE),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // We get a button
    const button = canvas.getAllByRole('button', { name: args.label!.toString() })[0]
    await expect(button).toBeInTheDocument()

    // Hovering should bring up the tooltip,
    // which should have the description, formatted as MarkDown
    await userEvent.hover(button, { delay: 500 })
    const tooltip = screen.getByRole('tooltip')
    await expect(tooltip).toHaveTextContent(EXCUSE)

    // Clicking does nothing
    await userEvent.click(button)
    await expect(args.action).not.toBeCalled()
  },
}

export const LongAction: Story = {
  args: {
    name: 'calculateTheAnswer',
    pendingLabel: 'Calculating',
    action: fn(async () => await sleep(1000)),
  },
  play: async ({ args, canvasElement }) => {
    // We get a button
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()

    // Clicking will execute the action
    await userEvent.click(button)

    // Pending state will be indicated with spinner
    let spinner = canvasElement.querySelector('.lucide-loader-circle')
    await expect(spinner).toBeInTheDocument()

    // label will be replaced with pending label
    await expect(button).toHaveTextContent(args.pendingLabel!.toString())

    // Wait for the action to finish
    await sleep(1100)

    // label will be restored to original content
    await expect(button).toHaveTextContent(camelToTitleCase(args.name))

    // Spinner will be gone
    spinner = canvasElement.querySelector('.lucide-loader-circle')
    await expect(spinner).toBeNull()
  },
}

export const WithExecutionStatus: Story = {
  args: {
    name: 'calculateTheAnswer',
    action: fn(async ({ setStatus }) => {
      setStatus('Phase one..')
      await sleep(500)
      setStatus('Phase two..')
      await sleep(500)
    }),
  },

  play: async ({ canvasElement }) => {
    // We get a button
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()

    // Clicking will start the process, and first phase message is shown
    await userEvent.click(button)
    const status = canvas.getByRole('status-message')
    await expect(status).toHaveTextContent('Phase one')

    // Wait for phase 1 to finish
    await sleep(550)

    // Second phase message is visible
    await expect(status).toHaveTextContent('Phase two')

    // Wait for phase 2 to finish
    await sleep(550)

    // Status message is no longer shown
    await expect(status).not.toBeInTheDocument()
  },
}

const WARNING = 'I have a bad feeling about this.'

export const WithWarning: Story = {
  args: {
    name: 'longAction',
    label: 'Just do it',
    pendingLabel: 'Doing it',
    action: fn(({ warn }) => warn(WARNING)),
  },
  play: async ({ canvasElement }) => {
    // We get a button
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()

    // Clicking will execute the action
    await userEvent.click(button)

    // Warning message will be visible
    const warning = canvas.getByRole('field-warning')
    await expect(warning).toHaveTextContent(WARNING)
  },
}

const FAILURE = "I don't know the answer."

export const WithError: Story = {
  args: {
    name: 'calculateTheAnswer',
    action: fn(async () => {
      await sleep(500)
      throw new Error(FAILURE)
    }),
  },
  play: async ({ canvasElement }) => {
    // We get a button
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()

    // Clicking will execute the action
    await userEvent.click(button)

    // Wait for it to finish
    await sleep(550)

    // Warning message will be visible
    const error = canvas.getByRole('field-error')
    await expect(error).toHaveTextContent(FAILURE)
  },
}

export const WithLogMessages: Story = {
  args: {
    name: 'longAction',
    label: 'Calculate the answer',
    action: async ({ log }) => {
      await sleep(500)
      log('Output from the action.')
      await sleep(500)
      log('More output from the action.')
      await sleep(500)
    },
  },
  play: async ({ canvasElement }) => {
    // We get a button
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()

    // Clicking will execute the action
    await userEvent.click(button)

    await sleep(1600)

    // Warning message will be visible
    const messages = canvas.getAllByRole('field-info')
    await expect(messages[0]).toHaveTextContent('Output from the action')
    await expect(messages[1]).toHaveTextContent('More output from the action')
  },
}
