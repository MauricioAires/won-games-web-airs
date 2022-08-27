import 'match-media.mock'
import { screen, render } from 'utils/test-utils'

import bannerMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Home, { HomeTemplateProps } from '.'

const props: HomeTemplateProps = {
  banners: bannerMock,
  newGames: [gamesMock[0]],
  newGamesTitle: 'New Games',
  mostPopularGamesTitle: 'Popular Games',
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcomingGamesTitle: 'Upcoming Games',
  upcomingGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  freeGamesTitle: 'Free Games',
  freeGames: [gamesMock[0]],
  freeHighlight: highlightMock
}

/**
 * mock de componentes
 */
jest.mock('templates/Base', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>
    }
  }
})

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>
    }
  }
})

describe('<Home />', () => {
  it('should render banner and showcases', () => {
    render(<Home {...props} />)

    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument()
  })
})
