import Base from 'templates/Base'
import Showcase from 'components/Showcase'
import Heading from 'components/Heading'
import CartList, { CartListProps } from 'components/CartList'
import PaymentOptions, { PaymentOptionsProps } from 'components/PaymentOptions'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

import * as S from './styles'

export type CartTemplateProps = {
  recommendTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
} & CartListProps &
  Pick<PaymentOptionsProps, 'cards'>

const Cart = ({
  recommendedGames,
  recommendedHighlight,
  cards,
  recommendTitle
}: CartTemplateProps) => {
  const handlePayment = () => {
    console.log('Handle payment action')
  }

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />
          <PaymentOptions cards={cards} handlePayment={handlePayment} />
        </S.Content>

        <Divider />
      </Container>

      <Showcase
        title={recommendTitle || 'You may like these games'}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Cart
