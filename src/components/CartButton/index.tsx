import Button, { ButtonProps } from 'components/Button'
import { useCart } from 'hooks/use-cart'
import { AddShoppingCartIcon, RemoveShoppingCartIcon } from 'styles/icons'

export type CartButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const CartButton = ({
  id,
  size = 'small',
  hasText = false
}: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()

  const ButtonText = isInCart(id) ? 'Remove from cart' : 'Add to cart '

  return (
    <Button
      icon={isInCart(id) ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
      size={size}
      aria-label={ButtonText}
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default CartButton
