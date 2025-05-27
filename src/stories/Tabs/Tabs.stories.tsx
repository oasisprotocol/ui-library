import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=183-417&p=f&t=rG6P3b3iuIBRN7eO-0',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'account',
    children: (
      <>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 1</p>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 2</p>
          </div>
        </TabsContent>
        <TabsContent value="transfers">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 3</p>
          </div>
        </TabsContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tabsList = canvas.getByRole('tablist')
    await expect(tabsList).toBeInTheDocument()
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'account',
    children: (
      <>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="events" disabled>
            Events
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 1</p>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 2</p>
          </div>
        </TabsContent>
      </>
    ),
  },
}
