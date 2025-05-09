import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ChevronsUpDown } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=60-434&p=f&t=uuwNBOkjxCfoISCP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultCollapsible() {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          Transaction methods
          <CollapsibleTrigger>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Contract Creation</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Consensus Deposit</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Consensus Withdraw</div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('Toggle')
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    const content = canvas.getByText('Contract Creation')
    await expect(content).toBeVisible()
  },
}
