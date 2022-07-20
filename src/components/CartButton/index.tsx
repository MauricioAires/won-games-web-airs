import Button from 'components/Button'
import { useCart } from 'hooks/use-cart'
import { AddShoppingCartIcon, RemoveShoppingCartIcon } from 'styles/icons'

export type CartButtonProps = {
  id: string
}

const CartButton = ({ id }: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()

  return (
    <Button
      icon={
        isInCart(id) ? (
          <RemoveShoppingCartIcon aria-label="remove from cart" />
        ) : (
          <AddShoppingCartIcon aria-label="add to cart" />
        )
      }
      size="small"
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
    />
  )
}

export default CartButton
