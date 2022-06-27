import Cart, { CartTemplateProps } from 'templates/Cart'

import mockGames from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'
import mockCartList from 'components/CartList/mock'
import mockPaymentOptions from 'components/PaymentOptions/mock'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export async function getServerSideProps() {
  return {
    props: {
      items: mockCartList,
      total: 'R$ 430,00',
      recommendedGames: mockGames,
      recommendedHighlight: mockHighlight,
      cards: mockPaymentOptions
    }
  }
}
