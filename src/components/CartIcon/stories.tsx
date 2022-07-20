import { Story, Meta } from '@storybook/react'
import CartIcon from '.'

export default {
  title: 'Library/CartIcon',
  component: CartIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story = (args) => <CartIcon {...args} />

export const Default = Template.bind({})

export const WithBadge = Template.bind({})

WithBadge.args = {
  quantity: 12
}
