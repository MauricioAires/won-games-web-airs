import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'

import Game, { GameTemplateProps } from 'templates/Game'

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { GetStaticProps } from 'next'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  QueryUpcoming,
  QueryUpcomingVariables
} from 'graphql/generated/QueryUpcoming'
import { QUERY_UPCOMING } from 'graphql/queries/upcoming'
import { getImageUrl } from 'utils/getImageUrl'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  // se a rota não tiver sido gerada
  // poder mostra loading
  // sceleton
  if (router.isFallback) return <p>Carregando...</p>
  return <Game {...props} />
}

export async function getStaticPaths() {
  // Aqui faz uma requisição para buscar toas
  // as rotas possiveis

  /**
   * page dinamyc path, how to create ?!
   *
   * SSR - HTML
   */
  // return {
  //   paths: [
  //     {
  //       params: {
  //         slug: 'ws'
  //       }
  //     }
  //   ],
  //   fallback: false
  // }

  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: parseInt(process.env.NEXT_PUBLIC_GAMES_LIMIT!)
    }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

// gerar em buil time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: {
      slug: `${params?.slug}`
    }
  })

  // next entente que é para manda para a pagina 404
  if (!data.games.length) {
    return {
      notFound: true
    }
  }

  const game = data.games[0]

  // get recommended
  const {
    data: { recommended }
  } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  // get recommende games and highlight
  const TODAY = new Date().toISOString().slice(0, 10) // 2021-01-27

  const { data: upcoming } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: {
      date: TODAY
    },
    fetchPolicy: 'no-cache'
  })

  return {
    revalidate: 60,
    props: {
      slug: params?.slug,
      cover: getImageUrl(game.cover?.src),
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery.map((image) => ({
        src: getImageUrl(image.src),
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.sections?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcoming.sections?.upcomingGames?.highlight
      ),
      recommendedTitle: recommended?.section?.title,
      recommendedGames: gamesMapper(recommended?.section?.games)
    }
  }
}
