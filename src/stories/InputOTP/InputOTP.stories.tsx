import type { StoryObj } from '@storybook/react-vite'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp.tsx'

const meta = {
  title: 'Components/InputOTP',
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component: 'Accessible one-time password component with copy paste functionality.',
      },
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/dSsI9L6NSpNCorbSdiYd1k/Oasis-Design-System---shadcn-ui---Default---December-2024?node-id=76-89&p=f&t=iW88SLGahpEsGDfj-0',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const Default: Story = {
  args: {
    disabled: false,
    maxLength: 6,
  },
  render: args => (
    <InputOTP maxLength={args.maxLength} disabled={args.disabled}>
      <InputOTPGroup>
        {Array.from({ length: args.maxLength }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}
