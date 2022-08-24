import { gql, QueryHookOptions, useQuery } from '@apollo/client'

import {
  QueryWishlist,
  QueryWishlistVariables
} from './../generated/QueryWishlist'
import { GameFragment } from 'graphql/fragments/game'

export const QUERY_WISHLIST = gql`
  query QueryWishlist($identifier: String!) {
    wishlists(where: { user: { email: $identifier } }) {
      id
      games {
        ...GameFragment
      }
    }
  }

  ${GameFragment}
`

/**
 * Criar um useQueryName para enviar ter que chamar
 * o useQuery e tipagems em todos os locais que for
 * utilizar os dados da wishlist
 *
 */
export function useQueryWishlist(
  options?: QueryHookOptions<QueryWishlist, QueryWishlistVariables>
) {
  return useQuery<QueryWishlist, QueryWishlistVariables>(
    QUERY_WISHLIST,
    options
  )
}
