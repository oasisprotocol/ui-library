import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '../../components/link'

const meta = {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'hover'],
      description: 'The visual style variant of the link',
    },
    textColor: {
      control: 'select',
      options: ['primary', 'inherit'],
      description: 'The text color scheme of the link',
      defaultValue: 'primary',
    },
    asChild: {
      control: 'boolean',
      description: 'When true, renders the child component with Link styles and props merged.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Oasis Explorer',
    href: '#',
    textColor: 'primary',
  },
}
