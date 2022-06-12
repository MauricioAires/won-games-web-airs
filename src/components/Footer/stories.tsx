import { Story, Meta } from '@storybook/react'
import Footer from '.'

export default {
  title: 'commom/Footer',
  component: Footer
} as Meta

export const Default: Story = () => (
  <div
    style={{
      maxWidth: '130rem',
      margin: '0 auto'
    }}
  >
    <Footer />
  </div>
)
