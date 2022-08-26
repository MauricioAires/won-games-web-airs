import 'session.mock'

import { screen, render } from 'utils/test-utils'

import GameInfo, { GameInfoProps } from '.'

const props: GameInfoProps = {
  id: '1',
  title: 'Game title',
  description: 'Game description',
  price: 210
}

const sut = (props: GameInfoProps) => render(<GameInfo {...props} />)

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    sut(props)

    expect(
      screen.getByRole('heading', { name: /game title/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/\$210\.00/i)).toBeInTheDocument()
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
        name: /add to wishlist/i
      })
    ).toBeInTheDocument()
  })
})
