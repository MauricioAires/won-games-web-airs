import { Story, Meta } from '@storybook/react'
import GameItem, { GameItemProps } from '.'

import mockGameItem from './mock'

export default {
  title: 'Game/GameItem',
  component: GameItem,
  args: mockGameItem
} as Meta

const Template: Story<GameItemProps> = (args) => <GameItem {...args} />

export const Default = Template.bind({})

export const WithPayment = Template.bind({})

WithPayment.args = {
  downloadLink: 'https://wongames.com/game/download',
  paymentInfo: {
    flag: 'mastercard',
    img: '/img/master-card.png',
    number: '**** **** **** 4326',
    purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
  }
}
