import { Story, Meta } from '@storybook/react'
import Empty, { EmptyProps } from '.'

export default {
  title: 'Library/Empty',
  component: Empty,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<EmptyProps> = (args) => <Empty {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Your wishlist is empty',
  description: 'Games added to your wishlist will appear here'
}
