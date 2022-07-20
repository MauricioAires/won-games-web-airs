import { Story, Meta } from '@storybook/react'
import CartButton from '.'

export default {
  title: 'Library/CartButton',
  component: CartButton
} as Meta

const Template: Story = (args) => <CartButton {...args} />

export const Default = Template.bind({})
