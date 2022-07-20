import { Story, Meta } from '@storybook/react'
import CartList from '.'
import mockItems from './mock'
export default {
  title: 'payment/CartList',
  component: CartList,
  argTypes: {
    cartContextValues: {
      type: 'symbol'
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story = (args) => (
  <div
    style={{
      maxWidth: 800
    }}
  >
    <CartList {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  total: 'R$ 330,00',
  cartContextDefaultValue: {
    items: mockItems
  }
}

export const WithButton = Template.bind({})

WithButton.args = {
  total: 'R$ 330,00',
  cartContextDefaultValue: {
    items: mockItems
  },
  hasButton: true
}

export const Empty = Template.bind({})

Empty.args = {
  items: []
}
