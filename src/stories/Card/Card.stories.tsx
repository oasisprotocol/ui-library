import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/cards'
import { Button } from '../../components/ui/button.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Displays a card with header, content, and footer.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=46-65&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByText('Card Title').closest('[data-slot="card"]')
    await expect(card).toBeInTheDocument()
  },
}

export const WithAction: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              Mark as Read
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>View and interact with your notifications here.</CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View all
          </Button>
        </CardFooter>
      </>
    ),
  },
}

export const SimpleCard: Story = {
  args: {
    children: <CardContent>This is a simple card with only content.</CardContent>,
  },
}
