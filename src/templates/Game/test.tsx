import 'session.mock'

import React from 'react'
import { render, screen } from 'utils/test-utils'

import mockGameInfo from 'components/GameInfo/mock'
import mockGallery from 'components/Gallery/mock'
import mockGameDetails from 'components/GameDetails/mock'
import mockGamesSlider from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

import Game, { GameTemplateProps } from './'

/**
 * mock de componentes
 */
jest.mock('templates/Base', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Gallery', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock Gallery" />
  }
}))

jest.mock('components/GameDetails', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock GameDetails" />
  }
}))

jest.mock('components/GameInfo', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock GameInfo" />
  }
}))

jest.mock('components/Showcase', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

const props: GameTemplateProps = {
  cover: 'bg-image.jpg',
  gameInfo: mockGameInfo,
  gallery: mockGallery,
  description: `<h1>Custom HTML</h1>`,
  details: mockGameDetails,
  upcomingTitle: 'Upcoming games',
  upcomingGames: mockGamesSlider,
  upcomingHighlight: mockHighlight,
  recommendedTitle: 'You may like these games',
  recommendedGames: mockGamesSlider
}

/**
 * Template de renderização, evitar a repetição da
 * chamada da função render  and destrcut props
 */
const sut = (props: GameTemplateProps) => render(<Game {...props} />)

describe('<Game />', () => {
  it('should render the template with componentes', () => {
    sut(props)

    expect(screen.getByTestId('Mock GameDetails')).toBeInTheDocument()
    expect(screen.getByTestId('Mock GameInfo')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(2)
    expect(screen.getByText(/custom html/i)).toBeInTheDocument()
  })

  it('should not render the gallery if no images', () => {
    sut({
      ...props,
      gallery: undefined
    })

    expect(screen.queryByTestId('Mock Gallery')).not.toBeInTheDocument()
  })

  it('should not render the gallery on mobile', () => {
    sut(props)

    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyle({
      display: 'none'
    })

    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyleRule(
      'display',
      'block',
      {
        media: '(min-width: 768px)'
      }
    )
  })

  it('should render the cover image', () => {
    sut(props)

    expect(
      screen.getByRole('img', {
        name: props.gameInfo.title
      })
    ).toBeInTheDocument()
  })
})
