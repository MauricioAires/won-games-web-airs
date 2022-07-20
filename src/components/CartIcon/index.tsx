import { useCart } from 'hooks/use-cart'
import { ShoppingCartIcon } from 'styles/icons'
import * as S from './styles'

const CartIcon = () => {
  const { quantity } = useCart()

  return (
    <S.Wrapper>
      {quantity > 0 && <S.Badge aria-label="Cart Items">{quantity}</S.Badge>}

      <ShoppingCartIcon aria-label="Shopping Cart" />
    </S.Wrapper>
  )
}

export default CartIcon
