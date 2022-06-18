import { Story, Meta } from '@storybook/react'
import GameDetails, { GameDetailsProps } from '.'
import mockGameDetails from './mock'

export default {
  title: 'Game/GameDetails',
  component: GameDetails,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  },
  args: mockGameDetails,
  argTypes: {
    releaseDate: {
      control: 'date'
    },
    platforms: {
      control: {
        type: 'inline-check',
        options: ['mac', 'linux', 'windows']
      }
    }
  }
} as Meta

export const Default: Story<GameDetailsProps> = (args) => (
  <div
    style={{
      maxWidth: '130rem',
      margin: '0 auto '
    }}
  >
    <GameDetails {...args} />
  </div>
)
