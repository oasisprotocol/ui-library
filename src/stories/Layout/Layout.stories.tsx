import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Layout,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../components'
import { expect, within } from 'storybook/test'
import { FileText, Home, Settings, User } from 'lucide-react'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive layout component that provides header, sidebar, main content area, breadcrumbs, and footer sections for building application layouts.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    headerContent: {
      control: false,
      description: 'Content to display in the header section',
    },
    headerBreadcrumbsContent: {
      control: false,
      description: 'Breadcrumb navigation content',
    },
    footerContent: {
      control: false,
      description: 'Content to display in the footer section',
    },
    sidebar: {
      control: false,
      description: 'Sidebar navigation content',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleSidebar = (
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
)

const sampleHeader = (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold">Oasis UI</h1>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="secondary">Beta</Badge>
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </div>
  </div>
)

const sampleBreadcrumbs = (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Layout</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
)

const sampleFooter = (
  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
    <p>© 2025 Oasis Protocol. All rights reserved.</p>
    <div className="flex gap-4">
      <a href="#" className="hover:text-foreground">
        Privacy
      </a>
      <a href="#" className="hover:text-foreground">
        Terms
      </a>
      <a href="#" className="hover:text-foreground">
        Support
      </a>
    </div>
  </div>
)

const sampleContent = (
  <div className="p-6 space-y-6">
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to the Layout Component</h2>
      <p className="text-muted-foreground mb-6">
        This is the main content area. The Layout component provides a flexible structure for building
        application interfaces with header, sidebar, breadcrumbs, main content, and footer sections.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Card {i + 1}</h3>
          <p className="text-sm text-muted-foreground">
            Sample content card demonstrating how the layout handles various content.
          </p>
        </div>
      ))}
    </div>
  </div>
)

export const Default: Story = {
  args: {
    headerContent: sampleHeader,
    headerBreadcrumbsContent: sampleBreadcrumbs,
    footerContent: sampleFooter,
    children: sampleContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const header = canvas.getByText('Oasis UI')
    await expect(header).toBeInTheDocument()
  },
}

export const WithSidebar: Story = {
  args: {
    headerContent: sampleHeader,
    headerBreadcrumbsContent: sampleBreadcrumbs,
    footerContent: sampleFooter,
    sidebar: sampleSidebar,
    children: sampleContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const header = canvas.getByText('Oasis UI')
    const sidebarItem = canvas.getByText('Dashboard')
    await expect(header).toBeInTheDocument()
    await expect(sidebarItem).toBeInTheDocument()
  },
}

export const HeaderOnly: Story = {
  args: {
    headerContent: sampleHeader,
    children: (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Simple Layout</h2>
        <p className="text-muted-foreground">This layout only includes a header and main content area.</p>
      </div>
    ),
  },
}

export const MinimalContent: Story = {
  args: {
    children: (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Minimal Layout</h2>
        <p className="text-muted-foreground">The most basic layout with just the main content area.</p>
      </div>
    ),
  },
}
