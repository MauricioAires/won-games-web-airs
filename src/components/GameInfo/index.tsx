import Button from 'components/Button'
import Heading from 'components/Heading'
import Ribbon from 'components/Ribbon'

import { AddShoppingCartIcon, FavoriteBorderIcon } from 'styles/icons'

import * as S from './styles'

export type GameInfoProps = {
  title: string
  description: string
  price: number
}

const GameInfo = ({ title, description, price }: GameInfoProps) => (
  <S.Wrapper>
    <Heading color="black" lineBottom>
      {title}
    </Heading>

    <Ribbon color="secondary">
      {new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)}
    </Ribbon>

    <S.Description>{description}</S.Description>

    <S.ButtonWrapper>
      <Button icon={<AddShoppingCartIcon />} size="large">
        Add to cart
      </Button>
      <Button icon={<FavoriteBorderIcon />} size="large" minimal>
        Wishlist
      </Button>
    </S.ButtonWrapper>
  </S.Wrapper>
)

export default GameInfo
