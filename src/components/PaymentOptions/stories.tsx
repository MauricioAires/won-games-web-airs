import { Story, Meta } from '@storybook/react'
import PaymentOptions, { PaymentOptionsProps } from '.'
import mockPaymentOptions from './mock'

export default {
  title: 'payment/PaymentOptions',
  component: PaymentOptions,
  args: {
    cards: mockPaymentOptions
  },
  argTypes: {
    handlePayment: {
      action: 'clicked'
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<PaymentOptionsProps> = (args) => (
  <div
    style={{
      maxWidth: 400,
      padding: 15
    }}
  >
    <PaymentOptions {...args} />
  </div>
)

export const Default = Template.bind({})
