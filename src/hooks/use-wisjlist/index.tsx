import { useState } from '@storybook/addons'
import { GameCardProps } from 'components/GameCard'
import { createContext, useContext } from 'react'

export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWiihslist: (id: string) => void
  loading: boolean
}

/**
 * Formato de test utilizado pela Rocksetat
 */
export const WishlistDefaultValues: WishlistContextData =
  {} as WishlistContextData
// export const WishlistDefaultValues: WishlistContextData = {
//   items: [],
//   isInWishlist: () => true,
//   addToWishlist: () => null,
//   removeFromWiihslist: () => null,
//   loading: true
// }

export const WishlistContext = createContext<WishlistContextData>(
  WishlistDefaultValues
)

export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [items, setItems] = useState<GameCardProps[]>([])
  const isInWishlist = (id: string) => {
    return false
  }
  const addToWishlist = (id: string) => {}

  const removeFromWiihslist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{
        items,
        isInWishlist,
        addToWishlist,
        removeFromWiihslist,
        loading: true
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
// hook
const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
