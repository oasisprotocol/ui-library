import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../../components/badge/index.tsx'
import { CircleCheckIcon, CircleOffIcon, CircleXIcon } from 'lucide-react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Displays a badge or a component that looks like a badge.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=23-995&p=f&t=RSGCFmRgOgVUlGFP-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const badge = canvas.getByText('Badge')
    await expect(badge).toBeInTheDocument()
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Yes
        <CircleCheckIcon />
      </>
    ),
    variant: 'success',
  },
}

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">ROFL Apps</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Inactive</Badge>
          <Badge variant="error">Removed</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">ROFL Replicas</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Expired</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Tokens</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="token-erc-20">Token (ERC-20)</Badge>
          <Badge variant="token-erc-721">Token (ERC-721)</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Validators</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Active</Badge>
          <Badge variant="info">Waiting</Badge>
          <Badge variant="error">Inactive</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Paratimes</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Online</Badge>
          <Badge variant="info">Coming soon</Badge>
          <Badge variant="error">Out-of-date</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Percentage gain</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">+24.94%</Badge>
          <Badge variant="error">-24.94%</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Proposals</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Passed</Badge>
          <Badge variant="partial-success">Active</Badge>
          <Badge variant="error">Rejected</Badge>
          <Badge variant="destructive">Failed</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Votes</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">
            Yes <CircleCheckIcon />
          </Badge>
          <Badge variant="muted">
            Abstained <CircleOffIcon />
          </Badge>
          <Badge variant="error">
            No <CircleXIcon />
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Contracts verification</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Verified</Badge>
          <Badge variant="partial-success">Partially Verified</Badge>
          <Badge variant="error">Unverified</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use cases for badges in different contexts.',
      },
    },
  },
}
