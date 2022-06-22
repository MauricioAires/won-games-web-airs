import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import mockGames from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

export async function getServerSideProps() {
  return {
    props: {
      games: mockGames,
      recommendedGames: mockGames,
      recommendedHighlight: mockHighlight
    }
  }
}
