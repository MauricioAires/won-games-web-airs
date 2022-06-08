import React from 'react'

import Home, { HomeTemplateProps } from 'templates/Home'

import bannersMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

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
export function getServerSideProps() {
  // faz uma lógica
  // buscar dados numa API
  // fazer calculo/leitura de context

  // retorna os dados
  return {
    props: {
      banners: bannersMock,
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
