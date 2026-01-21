import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
} from '../../components/ui/input-group'
import { Label } from '../../components'
import { expect, within, userEvent } from 'storybook/test'
import { Search, AtSign, X } from 'lucide-react'

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible input group component that allows combining inputs with addons, buttons, text, and icons in various configurations.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-md items-center gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="searchAction">Search</Label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="searchAction" placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="ghost" size="icon-xs" aria-label="Clear search">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <AtSign />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="email" type="email" placeholder="you@example.com" />
        </InputGroup>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const searchInput = canvas.getByPlaceholderText('Search...')
    await expect(searchInput).toBeInTheDocument()
    await userEvent.type(searchInput, 'Test query')
    await expect(searchInput).toHaveValue('Test query')
  },
}
