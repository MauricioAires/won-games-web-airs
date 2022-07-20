import { Story, Meta } from '@storybook/react'
import { CartContextData } from 'hooks/use-cart'
import GameCard, { GameCardProps } from '.'

export default {
  title: 'Library/GameCard',
  component: GameCard,
  args: {
    id: '1',
    slug: 'population-zero',
    title: 'Population Zero',
    developer: 'Rockstart Games',
    img: 'https://source.unsplash.com/user/willianjusten/300x140',
    price: 235
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

const Template: Story<GameCardProps & CartContextData> = (args) => (
  <div
    style={{
      width: '30rem'
    }}
  >
    <GameCard {...args} />
  </div>
)

export const Default = Template.bind({})

export const IsInCart = Template.bind({})

IsInCart.args = {
  isInCart: () => true
}

export const WithPromotion = Template.bind({})

WithPromotion.args = {
  promotionalPrice: 99.99,
  ribbon: '20% OFF',
  ribbonColor: 'primary',
  ribbonSize: 'small'
}
