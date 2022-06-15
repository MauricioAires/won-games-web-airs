import { Story, Meta } from '@storybook/react'
import FormSignUp from '.'

export default {
  title: 'form/FormSignUp',
  component: FormSignUp
} as Meta

export const Default: Story = () => (
  <div
    style={{
      width: 300,
      margin: 'auto'
    }}
  >
    <FormSignUp />
  </div>
)
