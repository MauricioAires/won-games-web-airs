import formatPrice from 'utils/format-price'

import Button from 'components/Button'
import Heading from 'components/Heading'
import Ribbon from 'components/Ribbon'

import { FavoriteBorderIcon } from 'styles/icons'

import * as S from './styles'
import CartButton from 'components/CartButton'

export type GameInfoProps = {
  id: string
  title: string
  description: string
  price: number
}

const GameInfo = ({ id, title, description, price }: GameInfoProps) => (
  <S.Wrapper>
    <Heading color="black" lineBottom>
      {title}
    </Heading>

    <Ribbon color="secondary">{formatPrice(price)}</Ribbon>

    <S.Description>{description}</S.Description>

    <S.ButtonWrapper>
      <CartButton id={id} size="large" hasText />
      <Button icon={<FavoriteBorderIcon />} size="large" minimal>
        Wishlist
      </Button>
    </S.ButtonWrapper>
  </S.Wrapper>
)

export default GameInfo
