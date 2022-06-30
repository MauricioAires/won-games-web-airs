import { Story, Meta } from '@storybook/react'
import { GameCardProps } from 'components/GameCard'
import GameCardSlider from '.'

import items from './mock'

export default {
  title: 'Library/GameCardSlider',
  component: GameCardSlider,
  args: { items },
  parameters: {
    layout: 'fullscreeen',
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<GameCardProps> = (args) => (
  <div
    style={{
      maxWidth: '130rem',
      margin: '0 auto'
    }}
  >
    <GameCardSlider color="white" items={items} {...args} />
  </div>
)
