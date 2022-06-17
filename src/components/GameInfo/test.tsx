import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameInfo, { GameInfoProps } from '.'

const props = {
  title: 'Game title',
  description: 'Game description',
  price: 'R$210.00'
}

const sut = (props: GameInfoProps) => renderWithTheme(<GameInfo {...props} />)

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    sut(props)

    expect(
      screen.getByRole('heading', { name: /game title/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/r\$210.00/i)).toBeInTheDocument()
    expect(screen.getByText(/game description/i)).toBeInTheDocument()
  })

  it('should render buttons', () => {
    sut(props)

    expect(
      screen.getByRole('button', {
        name: /add to cart/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /wishlist/i
      })
    ).toBeInTheDocument()
  })
})
