import { Story, Meta } from '@storybook/react'
import ProfileMenu, { ProfileMenuProps } from '.'

export default {
  title: 'profile/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<ProfileMenuProps> = (args) => <ProfileMenu {...args} />

export const Default = Template.bind({})

export const WithActiveLink = Template.bind({})

WithActiveLink.args = {
  activeLink: '/profile/me'
}
