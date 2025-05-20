import type { StoryObj } from '@storybook/react-vite'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination.tsx'
import { expect, within } from 'storybook/test'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination with page navigation, next and previous links.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=65-516&p=f&t=LMIwZIurfLRROj6v-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">15</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const pagination = canvas.getByRole('navigation')
    await expect(pagination).toBeInTheDocument()
    const activePage = canvas.getByText('2')
    await expect(activePage).toHaveAttribute('aria-current', 'page')
  },
}
