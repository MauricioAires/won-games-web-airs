import { screen, render } from 'utils/test-utils'

import OrdersList, { OrdersListProps } from '.'

import mockOrdersList from './mock'

jest.mock('components/GameItem', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock GameItem">{children}</div>
  }
}))

jest.mock('components/Empty', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Empty" />
  }
}))

const props: OrdersListProps = {
  items: mockOrdersList
}

const sut = (props: OrdersListProps) => render(<OrdersList {...props} />)

describe('<OrdersList />', () => {
  it('should render order list correctly', () => {
    sut(props)

    expect(
      screen.getByRole('heading', {
        name: /my orders/i
      })
    ).toBeInTheDocument()

    expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2)
  })

  it('should render empty state', () => {
    sut({})

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})
