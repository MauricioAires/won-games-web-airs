import React from 'react'

import Home, { HomeTemplateProps } from 'templates/Home'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import { initializeApollo } from 'utils/apollo'
import { QueryHome } from 'graphql/generated/QueryHome'
import { QUERY_HOME } from 'graphql/queries/home'

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

  const { data } = await apolloClient.query<QueryHome>({
    query: QUERY_HOME
  })

  return {
    props: {
      revalidate: 60,
      banners: data.banners.map((banner) => ({
        img: banner.image?.url || null,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonLabel: banner.button?.label || null,
        buttonLink: banner.button?.link || null,
        ...(banner.ribbon && {
          ribbon: banner.ribbon.text,
          ribbonColor: banner.ribbon.color,
          ribbonSize: banner.ribbon.size
        })
      })),
      newGames: gamesMock,
      mostPopularHighlight: highlightMock,
      mostPopularGames: gamesMock,
      upcommingGames: gamesMock,
      upcommingHighlight: highlightMock,
      upcommingMoreGames: gamesMock,
      freeGames: gamesMock,
      freeHighlight: highlightMock
    }
  }
}
