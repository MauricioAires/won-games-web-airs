import React from 'react'
import { render, screen } from 'utils/test-utils'

import mockGames from 'components/GameCardSlider/mock'
import mockHighlight from 'components/Highlight/mock'

import Wishlist, { WishlistTemplateProps } from '.'

/**
 * mock de componentes
 */
jest.mock('templates/Base', () => ({
  __esModule: true, // EU esqueci porque ele coloca esse esModule
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

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

const sut = (props: WishlistTemplateProps) => render(<Wishlist {...props} />)

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
