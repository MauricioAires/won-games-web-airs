import { Story, Meta } from '@storybook/react'
import Showcase from '.'

export default {
  title: 'Showcase',
  component: Showcase
} as Meta

export const Default: Story = () => <Showcase />
