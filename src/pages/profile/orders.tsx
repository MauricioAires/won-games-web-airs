import Profile from 'templates/Profile'

import mockOrdersList from 'components/OrdersList/mock'
import OrdersList, { OrdersListProps } from 'components/OrdersList'

export default function OrdersPage(props: OrdersListProps) {
  return (
    <Profile>
      <OrdersList {...props} />
    </Profile>
  )
}

export function getServerSideProps() {
  return {
    props: {
      items: mockOrdersList
    }
  }
}
