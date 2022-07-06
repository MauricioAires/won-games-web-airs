import React from 'react'

import Home, { HomeTemplateProps } from 'templates/Home'

import { initializeApollo } from 'utils/apollo'
import { QueryHome, QueryHomeVariables } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO!!!
// Os métodos getStatic/getServerSide SÓ FUNCIONA EM PAGES
// Não funciona em componentes nem em templates
// por isso todos os componentes deve receber props e
// não ter toda a lógica internar ( como eu fiz com as tabelas )

/// getStaticProps => gerar um estático em build time
// getServerSideProps => gerar via SSR a cada requisição
// getInitialProps => gerar via ss a cada request
export async function getStaticProps() {
  // faz uma lógica
  // buscar dados numa API
  // fazer calculo/leitura de context

  // retorna os dados

  const apolloClient = initializeApollo()
  const TODAY = new Date().toISOString().slice(0, 10) // 2021-01-27

  const {
    data: { banners, newGames, upcomingGames, freeGames, sections }
  } = await apolloClient.query<QueryHome, QueryHomeVariables>({
    query: QUERY_HOME,
    variables: {
      date: TODAY
    }
  })

  return {
    props: {
      revalidate: 60,
      banners: bannerMapper(banners),
      newGamesTitle: sections?.newGames?.title,
      newGames: gamesMapper(newGames),
      mostPopularGamesTitle: sections?.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGamesTitle: sections?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcomingGames),
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGamesTitle: sections?.freeGames?.title,
      freeGames: gamesMapper(freeGames),
      freeHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  }
}
