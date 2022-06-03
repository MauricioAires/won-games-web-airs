import { Story, Meta } from '@storybook/react'
import Highlight, { HighlightProps } from '.'

export default {
  title: 'Highlight',
  component: Highlight,
  args: {
    title: 'Read dead its back',
    subtitle: 'Come see Johns new adventure',
    backgroundImage: '/img/red-dead-img.jpg',
    buttonLabel: 'Buy now',
    buttonLink: '/rdr2'
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
