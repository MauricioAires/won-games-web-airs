/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import Button from 'components/Button'
import Ribbon, { RibbonColors, RibbonSize } from 'components/Ribbon'
import {
  FavoriteBorderIcon,
  FavoriteIcon,
  AddShoppingCartIcon
} from 'styles/icons'
import * as S from './styles'

export type GameCardProps = {
  slug: string
  title: string
  developer: string
  img: string
  price: string
  promotionalPrice?: string
  favorite?: boolean
  ribbon?: React.ReactNode
  ribbonColor?: RibbonColors
  ribbonSize?: RibbonSize
  onFav?: () => void
}

const GameCard = ({
  slug,
  title,
  developer,
  img,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor = 'primary',
  ribbonSize = 'normal',
  onFav
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
      <S.FavButton role="button" onClick={onFav}>
        {favorite ? (
          <FavoriteIcon aria-label="Remove from Wishlist" />
        ) : (
          <FavoriteBorderIcon aria-label="Add to Wishlist" />
        )}
      </S.FavButton>
      <S.BuyBox>
        {!!promotionalPrice && (
          <S.Price aria-label="Promotional price" isPromotional>
            {price}
          </S.Price>
        )}
        <S.Price aria-label="Game price">{promotionalPrice || price}</S.Price>
        <Button icon={<AddShoppingCartIcon />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
