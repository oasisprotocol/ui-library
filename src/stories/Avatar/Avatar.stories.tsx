import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'An image element with a fallback for representing the user.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=23-988&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <AvatarImage src="https://assets.oasis.io/explorer-tokens/rose.svg" alt="ROSE" />,
  },
}

export const AvatarWithFallback: Story = {
  args: {
    children: (
      <>
        <AvatarImage
          src="https://assets.oasis.io/explorer-tokens/invalid-image-url.png"
          alt="Invalid image"
        />
        <AvatarFallback>RS</AvatarFallback>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByText('RS')
    await expect(avatar).toBeInTheDocument()
  },
}

export const CustomSize: Story = {
  args: {
    className: 'size-16',
    children: (
      <>
        <AvatarImage src="https://assets.oasis.io/explorer-tokens/rose.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
}

export const WithCustomFallback: Story = {
  args: {
    children: (
      <>
        <AvatarImage
          src="https://assets.oasis.io/explorer-tokens/invalid-image-url.png"
          alt="Invalid image"
        />
        <AvatarFallback className="bg-primary text-primary-foreground">
          <span className="text-xs">User</span>
        </AvatarFallback>
      </>
    ),
  },
}
