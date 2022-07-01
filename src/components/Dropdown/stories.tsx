import { Story, Meta } from '@storybook/react'
import Dropdown, { DropdownProps } from '.'

export default {
  title: 'Library/Dropdown',
  component: Dropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Click here',
  children: 'content'
}
