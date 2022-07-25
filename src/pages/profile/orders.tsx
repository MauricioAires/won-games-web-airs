import Profile from 'templates/Profile'

import mockOrdersList from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'
import { GetServerSidePropsContext } from 'next'
import protectedRouter from 'utils/protected-routes'

export default function OrdersPage(props: OrdersListProps) {
  return (
    <Profile>
      <OrdersList {...props} />
    </Profile>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRouter(context)

  return {
    props: {
      session,
      items: mockOrdersList
    }
  }
}
