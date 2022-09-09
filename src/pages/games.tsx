import { initializeApollo } from 'utils/apollo'
import { QUERY_GAMES } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'

import Games, { GamesTemplateProps } from 'templates/Games'
import { GetServerSidePropsContext } from 'next'
import { parseQueryStringToWhere } from 'utils/filter'
import {
  genreFields,
  platformsFields,
  priceFields,
  sortFields
} from 'utils/filter/fields'

export default function GamePage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const filterPrice = {
    title: 'Price',
    name: 'price_lte',
    type: 'radio',
    fields: priceFields
  }

  const filterPlatforms = {
    title: 'Platforms',
    name: 'platforms',
    type: 'checkbox',
    fields: platformsFields
  }

  const filterSort = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: sortFields
  }

  const filterCategories = {
    title: 'Genres',
    name: 'categories',
    type: 'checkbox',
    fields: genreFields
  }

  const filterItems = [
    filterSort,
    filterPrice,
    filterPlatforms,
    filterCategories
  ]

  await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!),
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  return {
    props: {
      // revalidate: 60, // apenas para getStaticProps // gerar um estatico da pagina a cada 60s
      initialApolloState: apolloClient.cache.extract(),
      filterItems
    }
  }
}
