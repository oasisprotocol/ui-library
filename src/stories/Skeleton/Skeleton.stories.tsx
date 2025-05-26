import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '../../components/ui/skeleton.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: 'Use to show a placeholder while content is loading.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=64-243&p=f&t=mWN1FYN3h6Hghfln-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[200px] h-[20px]',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeleton = canvas.getByRole('generic')
    await expect(skeleton).toBeInTheDocument()
  },
}

export const Rectangle: Story = {
  args: {
    className: 'w-[250px] h-[100px]',
  },
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}
