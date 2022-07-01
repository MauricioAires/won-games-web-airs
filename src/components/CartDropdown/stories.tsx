import { Story, Meta } from '@storybook/react'
import CartDropdown, { CartDropdownProps } from '.'

import mockCartList from 'components/CartList/mock'

export default {
  title: 'Payment/CartDropdown',
  component: CartDropdown,
  args: {
    total: 'R$ 330,00',
    items: mockCartList
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<CartDropdownProps> = (args) => (
  <div
    style={{
      maxWidth: '90%',
      display: 'flex',
      justifyContent: 'flex-end'
    }}
  >
    <CartDropdown {...args} />
  </div>
)

export const Default = Template.bind({})

export const Empty = Template.bind({})

Empty.args = {
  items: []
}
