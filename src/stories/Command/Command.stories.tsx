import type { StoryObj } from '@storybook/react-vite'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command.tsx'
import { CalendarIcon, FileIcon, FolderIcon, SettingsIcon, UsersIcon } from 'lucide-react'

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=60-436&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  args: {},
  render: () => (
    <div className="w-[400px] border rounded-md">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <FolderIcon className="mr-2 h-4 w-4" />
              <span>Documents</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileIcon className="mr-2 h-4 w-4" />
              <span>Files</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Users</span>
            </CommandItem>
            <CommandItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
}
