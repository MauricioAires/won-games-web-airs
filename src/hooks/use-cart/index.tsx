import { useQueryGame } from 'graphql/queries/games'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import formatPrice from 'utils/format-price'
import { getStorageItem, setStorageItem } from 'utils/localStorage'
import { cartMapper } from 'utils/mappers'

const CART_KEY = 'cartItems'

export type CartItem = {
  id: string
  img: string
  title: string
  price: string
}

export type CartContextData = {
  items: CartItem[]
  quantity: number
  total: string
  loading: boolean
  isInCart: (id: string) => boolean
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const CartContextDefaultValue: CartContextData = {
  items: [],
  quantity: 0,
  total: '$0.00',
  loading: false,
  isInCart: () => false,
  addToCart: () => null,
  removeFromCart: () => null,
  clearCart: () => null
}

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValue
)

export type CartProviderProps = {
  children: React.ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItem] = useState<string[]>([])

  useEffect(() => {
    const data = getStorageItem(CART_KEY)

    if (data) {
      setCartItem(data)
    }
  }, [])

  const { data, loading } = useQueryGame({
    skip: !cartItems?.length, // Não executar a query no graphQl
    variables: {
      where: {
        id: cartItems
      }
    }
  })

  const total = data?.games.reduce((acc, game) => {
    return acc + game.price
  }, 0)

  const isInCart = (id: string) => (id ? cartItems.includes(id) : false)

  const saveCart = useCallback(async (cartItems: string[]) => {
    await setCartItem(cartItems)
    await setStorageItem(CART_KEY, cartItems)
  }, [])

  const addToCart = async (id: string) => {
    const newCartItems = [...cartItems, id]

    saveCart(newCartItems)
  }

  const removeFromCart = useCallback(
    (id: string) => {
      const newCartItems = cartItems.filter((itemId: string) => itemId !== id)
      saveCart(newCartItems)
    },
    [cartItems, saveCart]
  )

  const clearCart = useCallback(() => {
    saveCart([])
  }, [saveCart])

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total || 0),
        loading,
        isInCart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
