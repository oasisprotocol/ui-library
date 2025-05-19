import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button.tsx'
import { Circle } from 'lucide-react'
import { expect, fn, userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=296-5266&t=6Uj5s8xlwCsDNWYS-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
}

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
  },
}

export const Icon: Story = {
  args: {
    children: <Circle />,
    variant: 'default',
    size: 'icon',
  },
}

export const LeftIcon: Story = {
  args: {
    children: (
      <>
        <Circle /> Button
      </>
    ),
    variant: 'default',
    size: 'default',
  },
}
