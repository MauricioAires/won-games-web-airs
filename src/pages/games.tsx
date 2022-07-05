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

  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 9
    }
  })

  return {
    props: {
      revalidate: 60, // gerar um estatico da pagina a cada 60s
      games: data.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: game.cover ? game.cover.url : 'image.default',
        price: game.price
      })),
      filterItems: mockItemsProps
    }
  }
}
