import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '../../components'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'Displays a form textarea or a component that looks like a textarea.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=177-367&p=f&t=mWN1FYN3h6Hghfln-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
    readOnly: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText('Type your message here.')
    await expect(textarea).toBeInTheDocument()
  },
}
