import type { StoryObj } from '@storybook/react-vite'
import { Pagination } from '../../components/pagination'
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
  argTypes: {
    totalCount: {
      description:
        'The total number of records that match the query, i.e. the number of records the query would return with limit=infinity.',
      control: 'number',
    },
    isTotalCountClipped: {
      description: 'Whether total_count is clipped for performance reasons.',
      control: 'boolean',
    },
    onPageChange: {
      description: 'Optional callback function that is called when a page is selected.',
    },
    renderItem: {
      description:
        'Custom render function for pagination items. Used for router integration and translations.',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    totalCount: 99,
    selectedPage: 2,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const pagination = canvas.getByRole('navigation')
    await expect(pagination).toBeInTheDocument()
    const activePage = canvas.getByText('2')
    await expect(activePage).toHaveAttribute('aria-current', 'page')
  },
}

export const OnePage: Story = {
  args: {
    totalCount: 6,
    selectedPage: 1,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: false,
  },
}

export const TwoPages: Story = {
  args: {
    totalCount: 12,
    selectedPage: 1,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: false,
  },
}

export const FirstOfMany: Story = {
  args: {
    totalCount: 614,
    selectedPage: 1,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: false,
  },
}

export const FirstWithClippedTotal: Story = {
  args: {
    totalCount: 1000,
    selectedPage: 1,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: true,
  },
}

export const WithClippedTotalWithinRange: Story = {
  args: {
    totalCount: 1000,
    selectedPage: 10,
    rowsPerPage: 10,
    showFirstPageButton: true,
    showLastPageButton: true,
    isTotalCountClipped: true,
  },
}
