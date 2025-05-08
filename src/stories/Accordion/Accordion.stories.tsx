import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx'
import { expect } from 'storybook/test'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=1-434&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Accordion item #1</AccordionTrigger>
          <AccordionContent>Accordion content #1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Accordion item #2</AccordionTrigger>
          <AccordionContent>Accordion content #2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Accordion item #3</AccordionTrigger>
          <AccordionContent>Accordion content #3</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const accordion = canvasElement.querySelector('[data-slot="accordion"][data-orientation="vertical"]')
    await expect(accordion).not.toBeNull()
    const closedItems = canvasElement.querySelectorAll('[data-state="closed"][data-slot="accordion-item"]')
    await expect(closedItems.length).toBe(3)
  },
}

export const Disabled: Story = {
  args: {
    type: 'single',
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Available item</AccordionTrigger>
          <AccordionContent>This item is available for interaction.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger disabled>Disabled item</AccordionTrigger>
          <AccordionContent>
            This content won't be accessible because the trigger is disabled.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
}
