import type { Meta, StoryObj } from '@storybook/react-vite'
import * as LucideIcons from 'lucide-react'
import { CircleIcon } from 'lucide-react'

const iconNames = Object.keys(LucideIcons)
  .filter(key => !['createLucideIcon', 'Icon', 'DynamicIcon'].includes(key) && key.endsWith('Icon'))
  .sort()

const IconShowcase = ({ size = 24, color = 'currentColor', strokeWidth = 2 }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '16px',
        padding: '16px',
        maxHeight: '600px',
        overflowY: 'auto',
      }}
    >
      {iconNames.map(iconName => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<LucideIcons.LucideProps>
        return (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px',
              border: '1px solid currentColor',
              borderRadius: '4px',
              textAlign: 'center',
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
            }}
          >
            <IconComponent
              size={size}
              color={color}
              strokeWidth={strokeWidth}
              style={{ marginBottom: '8px', color: 'hsl(var(--foreground))' }}
            />
            <span
              style={{ fontSize: '12px', wordBreak: 'break-word', color: 'hsl(var(--muted-foreground))' }}
            >
              {iconName}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const meta = {
  title: 'Components/Icons',
  component: IconShowcase,
  parameters: {
    docs: {
      description: {
        component: `All ${iconNames.length} icons from [[lucide-react]](https://lucide.dev/icons/) library.`,
      },
    },
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=1-527&t=tnWLKnMbYBLihw6P-4',
    },
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 64, step: 2 },
      description: 'Icon size in pixels',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 4, step: 0.5 },
      description: 'Icon stroke width',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {
  args: {
    size: 24,
    color: 'currentColor',
    strokeWidth: 2,
  },
}

export const SingleIcon: Story = {
  render: args => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircleIcon {...args} />
      </div>
    )
  },
  args: {
    size: 24,
    color: 'currentColor',
    strokeWidth: 2,
  },
}
