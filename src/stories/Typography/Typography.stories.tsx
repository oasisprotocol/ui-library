import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '../../components/typography'

const meta: Meta<typeof Typography> = {
  title: 'Typography/Typography',
  component: Typography,
  parameters: {
    docs: {
      description: {
        component:
          'Project typography primitives (h1–h4, p, blockquote, small, lead, large). Use the `textColor` prop for muted text.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=473-1978',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'xsmall'],
    },
    textColor: {
      control: 'select',
      options: [undefined, 'muted'],
      description: 'Optional text color override (e.g., muted).',
    },
    asChild: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    variant: 'p',
    textColor: undefined,
    children: 'The quick brown fox jumps over the lazy dog.',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
