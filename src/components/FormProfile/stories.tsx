import { Story, Meta } from '@storybook/react'
import FormProfile from '.'

export default {
  title: 'form/FormProfile',
  component: FormProfile
} as Meta

const Template: Story = () => (
  <div
    style={{
      maxWidth: 860,
      margin: 'auto '
    }}
  >
    <FormProfile />
  </div>
)

export const Default = Template.bind({})
