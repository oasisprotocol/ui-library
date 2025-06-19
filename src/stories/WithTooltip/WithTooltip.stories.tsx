import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../components'
import { expect, within, userEvent, screen } from 'storybook/test'
import { WithTooltip } from '../../components'

const meta: Meta<typeof WithTooltip> = {
  title: 'ui-plus-behavior/WithTooltip',
  component: WithTooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Simplifying wrapper around Tooltip. Uses a Tooltip when additional information is available, no Tooltip otherwise. Markdown is supported for the overlay content.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    overlay: '_Tooltip_ **content**',
    children: <Button variant="outline">Hover me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'Hover me' })[0]
    await expect(button).toBeInTheDocument()

    // There should be no tooltip shown
    // await expect(screen.getByRole('tooltip')).toThrow() // TODO this exception escapes somehow

    // Hovering should bring up a tooltip
    await userEvent.hover(button, { delay: 250 })
    const tooltip = screen.getByRole('tooltip')
    await expect(tooltip).toContainHTML('<em>Tooltip</em> <strong>content</strong>')
  },
}

export const NoTooltip: Story = {
  args: {
    overlay: '',
    children: <Button variant="outline">No use hovering me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getAllByRole('button', { name: 'No use hovering me' })[0]
    await expect(button).toBeInTheDocument()

    await userEvent.hover(button, { delay: 250 })
    // There should be no tooltip shown
    // await expect(screen.getByRole('tooltip')).toThrow() // TODO this exception escapes somehow
  },
}

export const Variants: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">
          <WithTooltip side={'top'} overlay={'Tooltip on **Top**'}>
            <Button variant="outline">Top</Button>
          </WithTooltip>
        </div>

        <div className="flex justify-between gap-16">
          <WithTooltip side={'left'} overlay={'Tooltip on **Left**'}>
            <Button variant="outline">Left</Button>
          </WithTooltip>

          <WithTooltip side={'right'} overlay={'Tooltip on **Right**'}>
            <Button variant="outline">Right</Button>
          </WithTooltip>
        </div>

        <div className="flex justify-center gap-4">
          <WithTooltip side={'bottom'} overlay={'Tooltip on **Bottom**'}>
            <Button variant="outline">Bottom</Button>
          </WithTooltip>
        </div>
      </div>
    ),
  },
}
