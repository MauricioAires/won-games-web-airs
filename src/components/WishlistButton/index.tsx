import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'
import { useWishlist } from 'hooks/use-wishlist'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { FavoriteBorderIcon, FavoriteIcon } from 'styles/icons'

export type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({
  id,
  hasText = false,
  size = 'small'
}: WishlistButtonProps) => {
  const { isInWishlist, addToWishlist, removeFromWihslist } = useWishlist()
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const handleClick = async () => {
    setLoading(true)
    isInWishlist(id) ? await removeFromWihslist(id) : await addToWishlist(id)
    setLoading(false)
  }

  const buttonText = isInWishlist(id)
    ? 'Remove from wishlist'
    : 'Add to wishlist'

  // impedir a renderização

  if (!session) return null

  return (
    <Button
      size={size}
      onClick={handleClick}
      minimal
      icon={
        loading ? (
          <Spinner />
        ) : isInWishlist(id) ? (
          <FavoriteIcon aria-label={buttonText} />
        ) : (
          <FavoriteBorderIcon aria-label={buttonText} />
        )
      }
    >
      {hasText && buttonText}
    </Button>
  )
}

export default WishlistButton
