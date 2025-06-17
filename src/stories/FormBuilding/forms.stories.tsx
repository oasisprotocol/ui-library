import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import {
  deny,
  InputFieldGroup,
  sleep,
  useAction,
  useLabel,
  useOneOfField,
  useTextField,
} from '../../components/ui-plus-behavior/input'
import { validateFields } from '../../components/ui-plus-behavior/input/validation.ts'
import { useState } from 'react'
import { getFieldValues } from '../../components/ui-plus-behavior/input/fieldValues.ts'

const meta: Meta<typeof InputFieldGroup> = {
  title: 'ui-plus-behavior/validate() and <InputFieldGroup>',
  component: InputFieldGroup,
  parameters: {
    docs: {
      description: {
        component: 'Tools for handling multiple fields together.',
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
    const [currentUser, setCurrentUser] = useState<string>()

    const userLabel = useLabel({
      visible: !!currentUser,
      name: 'userlabel',
      value: `Currently logged in as ${currentUser}.`,
    })

    const username = useTextField({
      name: 'Username',
      visible: !currentUser,
      autoFocus: true,
      required: true,
      minLength: [3, n => `Name should be at least ${n} long!`],
      validators: n => (!n.includes('@') ? "This doesn't look like an email address" : undefined),
    })

    const password = useTextField({
      name: 'Password',
      visible: !currentUser,
      hideInput: true,
      required: true,
      onEnter: () => login.execute(),
    })

    const mode = useOneOfField({
      name: 'mode',
      visible: !currentUser,
      // placeholder: 'Please select mode',
      // required: true,
      choices: ['easy', 'normal', 'hard'] as const,
    })

    const loginFormFields = [username, password, mode, userLabel]

    const login = useAction({
      name: 'Log in',
      visible: !currentUser,
      action: async context => {
        const hasFieldErrors = await validateFields(loginFormFields, 'submit')
        if (!hasFieldErrors) {
          context.setStatus('Searching for user...')
          await sleep(1000)
          context.setStatus('Checking password...')
          await sleep(1000)
          if (password.value.length < 3) throw new Error('Invalid credentials')
          setCurrentUser(username.value)
        }
      },
    })

    const logout = useAction({
      name: 'Log out',
      enabled: currentUser ? true : deny("Can't log out when not logged in!"),
      action: () => setCurrentUser(undefined),
    })

    const register = useAction({
      name: 'register',
      visible: !currentUser,
      enabled: deny('Not yet implemented'),
      action: () => {},
    })

    const actions = [login, register, logout]

    return (
      <div className={'w-[400px]'}>
        <InputFieldGroup fields={loginFormFields} />
        <InputFieldGroup fields={[actions]} />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const MinimalForm: Story = {
  render: function Example() {
    const [values, setValues] = useState<Record<string, unknown>>()

    const form = [
      useLabel('Please tell us about your preferences!'),
      useTextField('Animal'),
      useTextField('Color'),
    ] as const
    const apply = useAction({
      name: 'apply',
      action: () => setValues(getFieldValues(form)),
    })
    return (
      <div className={'w-[400px]'}>
        <InputFieldGroup fields={[...form, apply]} />
        {values && <pre>{JSON.stringify(values, null, '  ')}</pre>}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const TypeSafeForm: Story = {
  render: function Example() {
    const [values, setValues] = useState<Record<string, unknown>>()

    const label = useLabel('Please tell us about your preferences!')
    const animal = useTextField('Animal')
    const color = useTextField('Color')

    const form = [label, animal, color] as const
    const apply = useAction({
      name: 'apply',
      action: () => {
        const newValues = {
          animal: animal.value,
          color: color.value,
        }
        // Here, we have a type-safe data
        setValues(newValues)
      },
    })

    return (
      <div className={'w-[400px]'}>
        <InputFieldGroup fields={[...form, apply]} />
        {values && <pre>{JSON.stringify(values, null, '  ')}</pre>}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Test button' })[0]
    await expect(button).toBeInTheDocument()
  },
}
