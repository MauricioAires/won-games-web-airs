import { screen, render } from 'utils/test-utils'
import mockCards from 'components/PaymentOptions/mock'

import CardsList, { CardsListProps } from '.'

const props: CardsListProps = {
  cards: mockCards
}

const sut = (props: CardsListProps) => render(<CardsList {...props} />)

describe('<CardsList />', () => {
  it('should render the cards list correctly', () => {
    sut(props)
    expect(
      screen.getByRole('heading', { name: /my cards/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', {
        name: /visa/i
      })
    ).toHaveAttribute('src', '/img/visa.png')

    expect(
      screen.getByRole('img', {
        name: /mastercard/i
      })
    ).toHaveAttribute('src', '/img/master-card.png')

    expect(screen.getByText(/4325/i)).toBeInTheDocument()
    expect(screen.getByText(/4326/i)).toBeInTheDocument()
  })
})
