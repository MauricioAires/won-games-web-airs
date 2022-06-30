import Games, { GamesTemplateProps } from 'templates/Games'

import mockItemsProps from 'components/ExploreSidebar/mock'
import mockGamesCardSlider from 'components/GameCardSlider/mock'

export default function GamePage(props: GamesTemplateProps) {
  return <Games {...props} />
}

export async function getServerSideProps() {
  return {
    props: {
      games: mockGamesCardSlider,
      filterItems: mockItemsProps
    }
  }
}
