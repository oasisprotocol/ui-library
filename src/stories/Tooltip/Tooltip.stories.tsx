import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { Button } from '@/components/ui/button.tsx'
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
    defaultOpen: {
      control: 'boolean',
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
    children: (
      <>
        <TooltipTrigger>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Hover me' })[0]
    await expect(button).toBeInTheDocument()
  },
}

export const Variants: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Tooltip on top</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-between gap-16">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Tooltip on left</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Tooltip on right</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tooltip on bottom</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    ),
  },
}
