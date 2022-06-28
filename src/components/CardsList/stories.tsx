import { Story, Meta } from '@storybook/react'
import CardsList, { CardsListProps } from '.'
import mockCards from 'components/PaymentOptions/mock'

export default {
  title: 'profile/CardsList',
  component: CardsList,
  args: {
    cards: mockCards
  }
} as Meta

const Template: Story<CardsListProps> = (args) => (
  <div
    style={{
      maxWidth: 850,
      margin: 'auto'
    }}
  >
    <CardsList {...args} />
  </div>
)

export const Default = Template.bind({})
