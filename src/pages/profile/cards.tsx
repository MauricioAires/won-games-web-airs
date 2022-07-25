import Profile from 'templates/Profile'

import mockCards from 'components/PaymentOptions/mock'
import CardsList, { CardsListProps } from 'components/CardsList'
import protectedRouter from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'

export default function CardsPage({ cards }: CardsListProps) {
  return (
    <Profile>
      <CardsList cards={cards} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRouter(context)
  return {
    props: {
      session,
      cards: mockCards
    }
  }
}
