import { Story, Meta } from '@storybook/react'
import UserDropdown, { UserDropdownProps } from '.'

export default {
  title: 'Library/UserDropdown',
  component: UserDropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  },
  args: {
    username: 'Mauricio '
  }
} as Meta

const Template: Story<UserDropdownProps> = (args) => (
  <div
    style={{
      maxWidth: '98%',
      display: 'flex',
      justifyContent: 'flex-end'
    }}
  >
    <UserDropdown {...args} />
  </div>
)

export const Default = Template.bind({})
