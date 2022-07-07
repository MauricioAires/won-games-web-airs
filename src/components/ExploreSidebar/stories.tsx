import { Story } from '@storybook/react'
import ExploreSidebar, { ExploreSidebarProps } from '.'

import mockExploreSidebar from './mock'

export default {
  title: 'Library/ExploreSidebar',
  component: ExploreSidebar,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  },
  args: {
    items: mockExploreSidebar,
    onFilter: () => console.log('Filter ')
  }
} as Metas

const Template: Story<ExploreSidebarProps> = (args) => (
  <ExploreSidebar {...args} />
)

export const Default = Template.bind({})

export const WithDefaultValues = Template.bind({})

WithDefaultValues.args = {
  initialValues: {
    platforms: ['windows', 'linux'],
    sort_by: 'low-to-high'
  }
}
