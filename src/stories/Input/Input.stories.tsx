import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../../components/ui/input.tsx'
import { Label } from '../../components/ui/label.tsx'
import { expect, within, userEvent } from 'storybook/test'
import { Rocket as LaunchIcon, Settings as SettingsIcon } from 'lucide-react'
import { SearchInput as SearchInputCmp } from '../../components/input'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Displays a form input field or a component that looks like an input field.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=65-520&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
    disabled: false,
  },
  render: args => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="demoInput">Label</Label>
      <Input {...args} id="demoInput" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter text')
    await expect(input).toBeInTheDocument()
    await userEvent.type(input, 'Hello, world!')
    await expect(input).toHaveValue('Hello, world!')
  },
}

export const WithManualIcon: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <SettingsIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-8" />
    </div>
  ),
}

export const WithStartAndEndDecoration: Story = {
  render: () => (
    <div className="w-[300px]">
      <Input
        placeholder="Search..."
        startDecoration={<SettingsIcon className="h-4 w-4 text-muted-foreground" />}
        endDecoration={<LaunchIcon className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="invalid">Invalid input</Label>
      <Input id="invalid" aria-invalid="true" placeholder="Invalid input example" />
      <p className="text-sm text-destructive">This field is required</p>
    </div>
  ),
}

export const SearchInput: Story = {
  render: function SearchInputExample() {
    const [value, setValue] = useState('')
    const hint = value && value.length < 3 ? 'Try searching for "Oasis"' : ''

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <SearchInputCmp placeholder="Search..." hint={hint} value={value} onChange={setValue} />
      </div>
    )
  },
}
