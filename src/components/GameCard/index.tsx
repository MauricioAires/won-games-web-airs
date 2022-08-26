/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import formatPrice from 'utils/format-price'
import Ribbon, { RibbonColors, RibbonSize } from 'components/Ribbon'
import CartButton from 'components/CartButton'

import * as S from './styles'
import WishlistButton from 'components/WishlistButton'

export type GameCardProps = {
  id: string
  slug: string
  title: string
  developer: string
  img: string
  price: number
  promotionalPrice?: number
  ribbon?: React.ReactNode
  ribbonColor?: RibbonColors
  ribbonSize?: RibbonSize
}

const GameCard = ({
  id,
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'normal'
}: GameCardProps) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon color={ribbonColor} size={ribbonSize}>
        {ribbon}
      </Ribbon>
    )}
    <Link href={`game/${slug}`} passHref>
      <S.ImageBox>
        <img src={img} alt={title} />
      </S.ImageBox>
    </Link>
    <S.Content>
      <Link href={`game/${slug}`} passHref>
        <S.Info>
          <S.Title>{title}</S.Title>
          <S.Developer>{developer}</S.Developer>
        </S.Info>
      </Link>
      <S.FavButton>
        <WishlistButton id={id} />
      </S.FavButton>

      <S.BuyBox>
        {!!promotionalPrice && (
          <S.Price aria-label="Promotional price" isPromotional>
            {formatPrice(price)}
          </S.Price>
        )}
        <S.Price aria-label="Game price">
          {formatPrice(promotionalPrice || price)}
        </S.Price>

        <CartButton id={id} />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
