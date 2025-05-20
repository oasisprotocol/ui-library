import type { StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { expect, within, userEvent } from 'storybook/test'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=64-316&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    defaultValue: 'one',
  },
  render: args => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="one" id="one" />
        <Label htmlFor="one">Option #1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="two" id="two" />
        <Label htmlFor="two">Option #2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="three" id="three" disabled />
        <Label htmlFor="three">Disabled</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radioOne = canvas.getByLabelText('Option #1')
    const radioTwo = canvas.getByLabelText('Option #2')
    const radioThree = canvas.getByLabelText('Disabled')
    await expect(radioOne).toBeChecked()
    await expect(radioTwo).not.toBeChecked()
    await userEvent.click(radioTwo)
    await expect(radioOne).not.toBeChecked()
    await expect(radioTwo).toBeChecked()
    expect(radioThree).toBeDisabled()
  },
}
