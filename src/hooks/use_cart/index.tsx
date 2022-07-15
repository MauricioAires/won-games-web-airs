import { useQueryGame } from 'graphql/queries/games'
import React, { createContext, useContext, useEffect, useState } from 'react'
import formatPrice from 'utils/format-price'
import { getStorageItem } from 'utils/localStorage'
import { cartMapper } from 'utils/mappers'

const CART_KEY = 'cartItems'

type CartItem = {
  id: string
  img?: string
  title: string
  price: string
}

export type CartContextData = {
  items: CartItem[]
  quantity: number
  total: string
}

export const CartContextDefaultValue: CartContextData = {
  items: [],
  quantity: 0,
  total: '$0.00'
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

  const { data } = useQueryGame({
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

  return (
    <CartContext.Provider
      value={{
        items: cartMapper(data?.games),
        quantity: cartItems.length,
        total: formatPrice(total || 0)
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
