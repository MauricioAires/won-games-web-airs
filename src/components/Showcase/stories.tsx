import { Meta, Story } from '@storybook/react'
import Showcase, { ShowcaseProps } from '.'
import highlightMock from 'components/Highlight/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default {
  title: 'Library/Showcase',
  component: Showcase,
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '0 auto'
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark'
    }
  },
  argTypes: {
    highlight: {
      type: 'symbol'
    },
    games: {
      type: 'symbol'
    }
  }
} as Meta

const Template: Story<ShowcaseProps> = (args) => <Showcase {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Most popular',
  highlight: highlightMock,
  games: gamesMock
}

export const WithoutGames = Template.bind({})

WithoutGames.args = {
  title: 'Most popular',
  highlight: highlightMock
}

export const WithoutHighlight = Template.bind({})

WithoutHighlight.args = {
  title: 'Most popular',
  games: gamesMock
}
