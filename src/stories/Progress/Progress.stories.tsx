import type { StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/ui/progress.tsx'
import { expect, within } from 'storybook/test'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=65-441&p=f&t=SrNzL28Dio13EYTM-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 40,
  },
  render: args => (
    <div className="w-[400px]">
      <Progress {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progress = canvas.getByRole('progressbar')
    await expect(progress).toBeInTheDocument()
  },
}
