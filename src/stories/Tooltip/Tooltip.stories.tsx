import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from '../../components/tooltip'
import { Button } from '../../components'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=122-10&p=f&t=rG6P3b3iuIBRN7eO-0',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The content of the tooltip',
    },
    side: {
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The preferred side of the trigger to render against',
    },
    open: {
      control: 'boolean',
    },
    delayDuration: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Tooltip content',
    children: <Button variant="outline">Hover me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Hover me' })[0]
    await expect(button).toBeInTheDocument()
  },
}
