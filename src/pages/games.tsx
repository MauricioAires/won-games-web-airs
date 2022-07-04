import { initializeApollo } from 'utils/apollo'

import Games, { GamesTemplateProps } from 'templates/Games'

import mockItemsProps from 'components/ExploreSidebar/mock'
import { QUERY_GAMES } from 'graphql/queries/games'

export default function GamePage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: QUERY_GAMES,
    variables: {
      limit: 9
    }
  })

  return {
    props: {
      revalidate: 60, // gerar um estatico da pagina a cada 60s
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      games: data.games.map((game: any) => ({
        title: game.name,
        developer: game.developers[0].name,
        img: game.cover ? game.cover.url : 'asdsad',
        price: new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD'
        }).format(game.price)
      })),
      filterItems: mockItemsProps
    }
  }
}
