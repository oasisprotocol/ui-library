import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '../../components'
import { BoldIcon } from 'lucide-react'
import { expect, within, userEvent } from 'storybook/test'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'A two-state button that can be either on or off.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=132-1671&p=f&t=LMIwZIurfLRROj6v-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <BoldIcon />
        Bold
      </>
    ),
    disabled: false,
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Bold' })
    await expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  },
}
