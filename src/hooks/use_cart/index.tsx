import React, { createContext, useContext, useEffect, useState } from 'react'
import { getStorageItem } from 'utils/localStorage'

const CART_KEY = 'cartItems'

export type CartContextData = {
  items: string[]
}

export const CartContextDefaultValue = {
  items: []
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

  return (
    <CartContext.Provider
      value={{
        items: cartItems
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
