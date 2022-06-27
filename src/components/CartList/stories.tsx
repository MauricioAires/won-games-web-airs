import { Story, Meta } from '@storybook/react'
import CartList, { CartListProps } from '.'
import mockCartList from './mock'
export default {
  title: 'CartList',
  component: CartList,
  args: {
    items: mockCartList,
    total: 'R$ 330,00'
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<CartListProps> = (args) => (
  <div
    style={{
      maxWidth: 800
    }}
  >
    <CartList {...args} />
  </div>
)

export const Default = Template.bind({})
