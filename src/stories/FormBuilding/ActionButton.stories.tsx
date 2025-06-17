import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { ActionButton, deny, sleep, useAction } from '../../components/ui-plus-behavior/input'
import { useState } from 'react'

const meta: Meta<typeof ActionButton> = {
  title: 'ui-plus-behavior/useAction() and <ActionButton>',
  component: ActionButton,
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
  render: function DefaultExample() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'test action',
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const Customized: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)

    const action = useAction({
      name: 'customizedAction',
      label: 'Customized **Action Button**',
      variant: 'destructive',
      size: 'lg',
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithDescription: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'descriptionAction',
      label: 'Action with description',
      description: 'There is a _description_ to this',
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithBooleanConfirmation: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'confirmedAction',
      label: 'Do something **wild**',
      confirmationNeeded: true,
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithStringConfirmation: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'confirmedAction',
      label: 'Do something **wild**',
      confirmationNeeded: 'Have you considered the consequences?',
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithCustomizedConfirmation: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'confirmedAction',
      label: 'Do something **wild**',
      confirmationNeeded: {
        description: 'Do you **really** want to do this?',
        cancelLabel: 'I would rather not',
        okLabel: 'LFG',
        variant: 'destructive',
      },
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const Disabled: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'disabledAction',
      label: 'Open the bay doors',
      enabled: deny("I'm sorry Dave, I'm afraid I can't do that."),
      action: () => setCounter(c => c + 1),
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const LongAction: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'longAction',
      label: 'Calculate the answer',
      pendingLabel: 'Calculating',
      action: async () => {
        await sleep(2000)
        setCounter(c => c + 1)
      },
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const ActionWithExecutionStatus: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'longAction',
      label: 'Calculate the answer',
      pendingLabel: 'Calculating',
      action: async context => {
        context.setStatus('Phase _one_..')
        await sleep(2000)
        context.setStatus('Phase **two**..')
        await sleep(2000)
        setCounter(c => c + 1)
      },
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithWarning: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'longAction',
      label: 'Just do it',
      pendingLabel: 'Doing it',
      action: async context => {
        await sleep(2000)
        context.warn('I have a bad feeling about this.')
        setCounter(c => c + 1)
      },
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithError: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'longAction',
      label: 'Calculate the answer',
      pendingLabel: 'Calculating',
      action: async () => {
        setCounter(c => c + 1)
        await sleep(2000)
        throw new Error("I don't know the answer.")
      },
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const WithLogMessages: Story = {
  render: function Example() {
    const [counter, setCounter] = useState(0)
    const action = useAction({
      name: 'longAction',
      label: 'Calculate the answer',
      pendingLabel: 'Calculating',
      action: async context => {
        await sleep(2000)
        context.log('Output from the action.')
        await sleep(2000)
        context.log('More output from the action.')
        await sleep(2000)
        setCounter(c => c + 1)
      },
    })

    return (
      <div className={'w-[400px]'}>
        <ActionButton {...action} /> {/* This is our component */}
        <p>Action executed {counter} times.</p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}
