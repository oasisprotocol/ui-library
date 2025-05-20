import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'A responsive table component.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=184-890&p=f&t=wiAnBZzlnMC9rGYE-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  {
    name: 'WT3',
    id: 'rofl1qpdzzm4h73gtes04xjn4whan84s3k33l5gx787l2',
    activeInstances: '4',
  },
  {
    name: 'demo-rofl-www',
    id: 'rofl1qzlnrvcjsqlwtzxuhuywz3kpvflms2dp7uyc2xwf',
    activeInstances: '1',
  },
  {
    name: 'rofl-scheduler',
    id: 'rofl1qr95suussttd2g9ehu3zcpgx8ewtwgayyuzsl0x2',
    activeInstances: '0',
  },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Caption placeholder</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>App ID</TableHead>
          <TableHead className="text-right">Active instances</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={invoice.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.id}</TableCell>
            <TableCell className="text-right">{invoice.activeInstances}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Table footer</TableCell>
          <TableCell className="text-right">5</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const table = canvas.getByRole('table')
    await expect(table).toBeInTheDocument()
  },
}
