import { Story, Meta } from '@storybook/react'
import Highlight, { HighlightProps } from '.'
import item from './mock'

export default {
  title: 'Library/Highlight',
  component: Highlight,
  args: {
    ...item
  }
} as Meta

export const Default: Story<HighlightProps> = (args) => (
  <div
    style={{
      maxWidth: '104rem'
    }}
  >
    <Highlight {...args} />
  </div>
)

export const WithFloatImage: Story<HighlightProps> = (args) => (
  <div
    style={{
      maxWidth: '104rem'
    }}
  >
    <Highlight {...args} />
  </div>
)

WithFloatImage.args = {
  floatImage: '/img/red-dead-float.png'
}
export const WithFloatImageLeft: Story<HighlightProps> = (args) => (
  <div
    style={{
      maxWidth: '104rem'
    }}
  >
    <Highlight {...args} />
  </div>
)

WithFloatImageLeft.args = {
  floatImage: '/img/red-dead-float.png',
  alignment: 'left'
}
