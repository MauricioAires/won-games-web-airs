import Profile from 'templates/Profile'

import mockCards from 'components/PaymentOptions/mock'
import CardsList, { CardsListProps } from 'components/CardsList'

export default function CardsPage({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export function getServerSideProps() {
  return {
    props: {
      cards: mockCards
    }
  }
}
