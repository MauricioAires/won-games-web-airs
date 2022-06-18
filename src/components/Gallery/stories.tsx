import { Story, Meta } from '@storybook/react'
import Gallery, { GalleryProps } from '.'

import mockGallery from './mock'

export default {
  title: 'Game/Gallery',
  component: Gallery,
  args: {
    items: mockGallery
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark'
    }
  },
  argTypes: {
    items: {
      type: 'symbol'
    }
  }
} as Meta

const Template: Story<GalleryProps> = (args) => (
  <div
    style={{
      maxWidth: '130rem',
      margin: '0 auto'
    }}
  >
    <Gallery {...args} />
  </div>
)

export const Default = Template.bind({})
