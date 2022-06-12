import { Story, Meta } from '@storybook/react'
import Logo, { LogoProps } from '.'

export default {
  title: 'commom/Logo',
  component: Logo
} as Meta

export const Default: Story = (args: LogoProps) => <Logo {...args} />
