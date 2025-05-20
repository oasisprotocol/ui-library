import type { StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { expect, within } from 'storybook/test'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=296-207&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const scrollArea = canvas.getByText('Tags').parentElement?.parentElement
    await expect(scrollArea).toBeInTheDocument()
  },
}
