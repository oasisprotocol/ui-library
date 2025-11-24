import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '../../components'
import { HomeIcon, SettingsIcon, UsersIcon, FileIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

type SidebarStoryProps = React.ComponentProps<typeof SidebarProvider> & {
  variant?: 'sidebar' | 'floating' | 'inset'
  side?: 'left' | 'right'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

const meta: Meta<SidebarStoryProps> = {
  title: 'Components/Sidebar',
  component: SidebarProvider,
  parameters: {
    docs: {
      description: {
        component: 'A composable, themeable and customizable sidebar component.',
      },
    },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=3212-19592&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    collapsible: 'offcanvas',
    defaultOpen: true,
    side: 'left',
    variant: 'sidebar',
  },
  argTypes: {
    variant: {
      description: 'Child Sidebar component prop.',
      options: ['sidebar', 'floating', 'inset'],
      control: { type: 'radio' },
    },
    side: {
      description: 'Child Sidebar component prop.',
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    collapsible: {
      description: 'Child Sidebar component prop.',
      options: ['offcanvas', 'icon', 'none'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <SidebarProvider defaultOpen={args.defaultOpen}>
      <Sidebar variant={args.variant} side={args.side} collapsible={args.collapsible}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Dashboard</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <UsersIcon />
                    <span>Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FileIcon />
                    <span>Documents</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <SidebarTrigger />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sidebar = canvas.getByText('Navigation')
    await expect(sidebar).toBeInTheDocument()
  },
}
