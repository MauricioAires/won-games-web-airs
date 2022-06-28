import Profile from 'templates/Profile'

import mockCards from 'components/PaymentOptions/mock'

export default function OrdersPage() {
  return (
    <Profile>
      <div>Vai aparecer aqui</div>
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
