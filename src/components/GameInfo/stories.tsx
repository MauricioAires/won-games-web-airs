import { Story, Meta } from '@storybook/react'
import GameInfo, { GameInfoProps } from '.'
import mockGame from './mock'

export default {
  title: 'Game/GameInfo',
  component: GameInfo,
  args: mockGame,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

const Template: Story<GameInfoProps> = (args) => (
  <div
    style={{
      maxWidth: '144rem',
      margin: '0 auto',
      padding: '1.5rem'
    }}
  >
    <GameInfo {...args} />
  </div>
)

export const Default = Template.bind({})
