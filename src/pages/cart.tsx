import Cart, { CartTemplateProps } from 'templates/Cart'

import mockCartList from 'components/CartList/mock'
import mockPaymentOptions from 'components/PaymentOptions/mock'
import { initializeApollo } from 'utils/apollo'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRouter from 'utils/protected-routes'
import { GetServerSidePropsContext } from 'next'

export default function CartPage(props: CartTemplateProps) {
  return <Cart {...props} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRouter(context)
  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      session,
      items: mockCartList,
      total: 'R$ 430,00',
      recommendTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      ),
      cards: mockPaymentOptions
    }
  }
}
