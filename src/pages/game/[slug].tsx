import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'

import Game, { GameTemplateProps } from 'templates/Game'

import mockGamesSlider from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { GetStaticProps } from 'next'

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
      limit: 9
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

  return {
    revalidate: 60,
    props: {
      cover: game.cover?.src,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.gallery,
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcommingGames: mockGamesSlider,
      upcommingHighlight: mockHighlight,
      recommendedGames: mockGamesSlider
    }
  }
}
