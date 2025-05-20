import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: 'Displays content within a desired ratio.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=21-535&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: args => (
    <div className="w-[400px]">
      <AspectRatio {...args}>
        <img
          src="https://assets.oasis.io/rose-app-discover/OasisExplorer.svg"
          alt="Image"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
}
