import { GetServerSidePropsContext } from 'next'

import { initializeApollo } from 'utils/apollo'

import {
  QueryWishlist,
  QueryWishlistVariables
} from 'graphql/generated/QueryWishlist'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'

import protectedRouter from 'utils/protected-routes'
import { gamesMapper, highlightMapper } from 'utils/mappers'

import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import { QUERY_WISHLIST } from 'graphql/queries/wishlist'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRouter(context)

  const apolloClient = initializeApollo(null, session)

  if (!session) {
    return {
      props: {}
    }
  }

  // realizar a requisiççao da wishlist apenas para adiconar os items ao cache do apollo
  await apolloClient.query<QueryWishlist, QueryWishlistVariables>({
    query: QUERY_WISHLIST,
    variables: {
      identifier: session?.user?.email as string
    }
  })

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      session,
      initialApolloState: apolloClient.cache.extract(),
      recommendeTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  }
}
