import { Story, Meta } from '@storybook/react'
import GameCard, { GameCardProps } from '.'

export default {
  title: 'Library/GameCard',
  component: GameCard,
  args: {
    title: 'Population Zero',
    developer: 'Rockstart Games',
    img: 'https://source.unsplash.com/user/willianjusten/300x140',
    price: 'R$ 235.00'
  },
  argTypes: {
    promotionalPrice: {
      type: 'string',
      description: 'Valor da promoção'
    },
    ribbon: {
      type: 'string'
    },
    onFav: {
      action: 'click'
    }
  }
} as Meta

export const Default: Story<GameCardProps> = (args) => (
  <div
    style={{
      width: '30rem'
    }}
  >
    <GameCard {...args} />
  </div>
)

export const WithPromotion: Story<GameCardProps> = (args) => (
  <div
    style={{
      width: '30rem'
    }}
  >
    <GameCard {...args} />
  </div>
)

WithPromotion.args = {
  promotionalPrice: 'R$99.99',
  ribbon: '20% OFF',
  ribbonColor: 'primary',
  ribbonSize: 'small'
}
