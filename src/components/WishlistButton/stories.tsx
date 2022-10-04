import { Story, Meta } from '@storybook/react'
import WishlistButton from '.'

export default {
  title: 'Library/WishlistButton',
  component: WishlistButton
} as Meta

const Template: Story = (args) => <WishlistButton id={''} {...args} />

export const Default = Template.bind({})
