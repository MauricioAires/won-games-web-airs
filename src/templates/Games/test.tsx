import { renderWithTheme } from 'utils/tests/helpers'

import mockItemsProps from 'components/ExploreSidebar/mock'
import mockGamesCardSlider from 'components/GameCardSlider/mock'

import Game, { GamesTemplateProps } from '.'
import React from 'react'
import { screen } from '@testing-library/react'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock ExploreSideBar" />
  }
}))

jest.mock('components/GameCard', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock GameCard" />
  }
}))

const props: GamesTemplateProps = {
  games: [mockGamesCardSlider[0]],
  filterItems: mockItemsProps
}

const sut = (props: GamesTemplateProps) => renderWithTheme(<Game {...props} />)

describe('<Games />', () => {
  it('should render sections', () => {
    sut(props)

    expect(screen.getByTestId('Mock ExploreSideBar')).toBeInTheDocument()
    expect(screen.getByTestId('Mock GameCard')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /show more/i
      })
    ).toBeInTheDocument()
  })
})
