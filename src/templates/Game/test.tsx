import { renderWithTheme } from 'utils/tests/helpers'

import mockGameInfo from 'components/GameInfo/mock'
import mockGallery from 'components/Gallery/mock'
import mockGameDetails from 'components/GameDetails/mock'
import mockGamesSlider from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

import Game, { GameTemplateProps } from './'
import { screen } from '@testing-library/react'

/**
 * mock de componentes
 */
jest.mock('components/Footer', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock Footer" />
  }
}))

jest.mock('components/Menu', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock() {
    return <div data-testid="Mock Menu" />
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
  upcommingGames: mockGamesSlider,
  upcommingHighlight: mockHighlight,
  recommendedGames: mockGamesSlider
}

/**
 * Template de renderização, evitar a repetição da
 * chamada da função renderWithTheme and destrcut props
 */
const sut = (props: GameTemplateProps) => renderWithTheme(<Game {...props} />)

describe('<Game />', () => {
  it('should render the template with componentes', () => {
    sut(props)

    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Footer')).toBeInTheDocument()
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

    const cover = screen.getByRole('image', {
      name: /cover/i
    })

    expect(cover).toHaveStyle({
      backgroundImage: 'url(bg-image.jpg)',
      height: '39.5rem'
    })
    expect(cover).toHaveStyleRule('height', '70rem', {
      media: '(min-width: 768px)'
    })

    expect(cover).toHaveStyleRule(
      'clip-path',
      'polygon(0 0,100% 0,100% 100%,0 85%)',
      {
        media: '(min-width:768px)'
      }
    )
  })
})
