import type { StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=216-2886&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  args: {
    openDelay: 0,
    closeDelay: 300,
  },
  render: args => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <a
          href="#"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          onClick={e => e.preventDefault()}
        >
          Hover card
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Hover Card Content</h4>
            <p className="text-sm text-muted-foreground">
              This is the content of the hover card. It can contain any information you want to show when
              hovering over the trigger element.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
