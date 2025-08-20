import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs'
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
    defaultValue: 'transactions',
    children: (
      <>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="disabled" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <p className="p-4 text-sm text-muted-foreground mt-2">TabsContent 1</p>
        </TabsContent>
        <TabsContent value="events">
          <p className="p-4 text-sm text-muted-foreground mt-2">TabsContent 2</p>
        </TabsContent>
        <TabsContent value="transfers">
          <p className="p-4 text-sm text-muted-foreground mt-2">TabsContent 3</p>
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

export const LayoutVariant: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <Tabs defaultValue="transactions">
        <TabsList variant="layout">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <div className="p-4 border rounded-b-md">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 1</p>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="p-4 border rounded-b-md">
            <p className="text-sm text-muted-foreground mt-2">TabsContent 2</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}
