import { initializeApollo } from 'utils/apollo'
import { QUERY_GAMES } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'

import Games, { GamesTemplateProps } from 'templates/Games'

import mockItemsProps from 'components/ExploreSidebar/mock'

export default function GamePage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 15
    }
  })

  return {
    props: {
      revalidate: 60, // gerar um estatico da pagina a cada 60s
      initialApolloState: apolloClient.cache.extract(),
      filterItems: mockItemsProps
    }
  }
}
