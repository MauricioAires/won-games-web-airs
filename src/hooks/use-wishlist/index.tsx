import { useMutation } from '@apollo/client'
import { GameCardProps } from 'components/GameCard'
import { MutationCreateWishlist } from 'graphql/generated/MutationCreateWishlist'
import { MutationUpdateWishlist } from 'graphql/generated/MutationUpdateWishlist'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { gamesMapper } from 'utils/mappers'

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
  const { data: session } = useSession()
  const [wishlistId, setWishlistId] = useState<string | null>(null)
  const [wishlistItems, setWihslistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  const [createList, { loading: loadingCreate }] =
    useMutation<MutationCreateWishlist>(MUTATION_CREATE_WISHLIST, {
      context: { session },
      onCompleted: (data) => {
        setWihslistItems(data.createWishlist?.wishlist?.games || [])
        // armazenr o id da wishlist criada
        setWishlistId(data.createWishlist?.wishlist?.id || null)
      }
    })

  const [updateList, { loading: loadingUpdate }] =
    useMutation<MutationUpdateWishlist>(MUTATION_UPDATE_WISHLIST, {
      context: { session },
      onCompleted: (data) => {
        setWihslistItems(data.updateWishlist?.wishlist?.games || [])
      }
    })

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setWihslistItems(data?.wishlists[0]?.games || [])

    // armazenar o id da wishlist carregada
    setWishlistId(data?.wishlists[0].id || null)
  }, [data])

  const wishlistIds = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  )

  const isInWishlist = (id: string) =>
    wishlistItems.findIndex((game) => game.id === id) !== -1

  const addToWishlist = (id: string) => {
    // se não exitir uma wishlist ela é criada se não é atualizada

    if (!wishlistId) {
      return createList({
        variables: {
          input: {
            data: {
              games: [...wishlistIds, id]
            }
          }
        }
      })
    }

    return updateList({
      variables: {
        input: {
          where: {
            id: wishlistId,
            data: {
              games: [...wishlistIds, id]
            }
          }
        }
      }
    })
  }

  const removeFromWiihslist = (id: string) => {
    return updateList({
      variables: {
        input: {
          where: {
            id: wishlistId
          },
          data: {
            games: wishlistIds.filter((gameId) => gameId !== id)
          }
        }
      }
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWiihslist,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
// hook
const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
