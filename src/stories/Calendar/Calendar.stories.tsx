import type { StoryObj } from '@storybook/react-vite'
import { Calendar } from '../../components'
import { expect, within } from 'storybook/test'

export type CalendarProps = React.ComponentProps<typeof Calendar>

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: 'A date field component that allows users to enter and edit date.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=37-1900&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {
    showOutsideDays: true,
    selected: new Date(),
  },
  render: () => <Calendar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const calendar = canvas.getByRole('grid')
    await expect(calendar).toBeInTheDocument()
  },
}
