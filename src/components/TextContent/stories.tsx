import { Story, Meta } from '@storybook/react'
import TextContent, { TextContentProps } from '.'
import mockTextContent from './mock'

export default {
  title: 'Game/TextContent',
  component: TextContent,
  args: mockTextContent,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<TextContentProps> = (args) => <TextContent {...args} />

export const Default = Template.bind({})
