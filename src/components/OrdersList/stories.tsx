import { Story, Meta } from '@storybook/react'
import OrdersList, { OrdersListProps } from '.'

import mockOrdersList from './mock'

export default {
  title: 'payment/OrdersList',
  component: OrdersList,
  args: {
    items: mockOrdersList
  }
} as Meta

const Template: Story<OrdersListProps> = (args) => (
  <div
    style={{
      maxWidth: 850,
      margin: 'auto'
    }}
  >
    <OrdersList {...args} />
  </div>
)

export const Default = Template.bind({})
