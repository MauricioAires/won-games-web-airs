import { screen, render } from 'utils/test-utils'

import mockCartList from './mock'

import CartList, { CartListProps } from '.'

const props: CartListProps = {
  items: mockCartList,
  total: 'R$ 330,00'
}

const sut = (props: CartListProps) => render(<CartList {...props} />)

describe('<CartList />', () => {
  it('should render the cart list', () => {
    sut(props)

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 330,00')).toHaveStyle({
      color: '#F231A5'
    })
  })

  it('should render the button', () => {
    sut({
      ...props,
      hasButton: true
    })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    sut({})

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})
