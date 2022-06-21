import Game, { GameTemplateProps } from 'templates/Game'

import mockGameInfo from 'components/GameInfo/mock'
import mockGallery from 'components/Gallery/mock'
import mockTextContent from 'components/TextContent/mock'
import mockGameDetails from 'components/GameDetails/mock'
import mockGamesSlider from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

export default function Index(props: GameTemplateProps) {
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
  return {
    paths: [
      {
        params: {
          slug: 'ws'
        }
      }
    ],
    fallback: false
  }
}

// gerar em buil time
export async function getStaticProps() {
  return {
    props: {
      cover:
        'https://images.gog-statics.com/5643a7c831df452d29005caeca24c28cdbfaa6fbea5a9556b147ee26d325fa70_bg_crop_1366x655.jpg',
      gameInfo: mockGameInfo,
      gallery: mockGallery,
      description: mockTextContent.content,
      details: mockGameDetails,
      upcommingGames: mockGamesSlider,
      upcommingHighlight: mockHighlight,
      recommendedGames: mockGamesSlider
    }
  }
}
