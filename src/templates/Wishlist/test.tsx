import { renderWithTheme } from 'utils/tests/helpers'

import mockGames from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

import Wishlist, { WishlistTemplateProps } from '.'
import { screen } from '@testing-library/react'

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Menu" />
  }
}))

const props: WishlistTemplateProps = {
  games: mockGames,
  recommendedGames: mockGames,
  recommendedHighlight: mockHighlight
}

const sut = (props: WishlistTemplateProps) =>
  renderWithTheme(<Wishlist {...props} />)

describe('<Wishlist />', () => {
  it('should render correctly', () => {
    sut(props)

    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /wishlist/i
      })
    ).toBeInTheDocument()

    expect(screen.getAllByText(/population zero/i)).toHaveLength(6)
  })

  it('should render empty when there are no games', () => {
    sut({
      ...props,
      games: undefined
    })

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /your wishlist is empty/i
      })
    ).toBeInTheDocument()
  })
})
