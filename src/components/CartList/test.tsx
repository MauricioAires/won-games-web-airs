import { CartContextDefaultValue } from 'hooks/use-cart'
import { screen, render, CustomRenderProps } from 'utils/test-utils'

import CartList, { CartListProps } from '.'
import mockItems from './mock'

const renderProps: CustomRenderProps = {
  cartProviderProps: {
    ...CartContextDefaultValue,
    items: mockItems,
    total: 'R$ 330,00'
  }
}
const sut = (props: CartListProps = {}, renderProps: CustomRenderProps = {}) =>
  render(<CartList {...props} />, {
    ...renderProps
  })

describe('<CartList />', () => {
  it('should render the cart list', () => {
    sut({}, renderProps)

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 330,00')).toHaveStyle({
      color: '#F231A5'
    })
  })

  it('should render the button', () => {
    sut(
      {
        hasButton: true
      },
      renderProps
    )

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render loading', () => {
    sut(
      {
        hasButton: true
      },
      {
        cartProviderProps: {
          ...CartContextDefaultValue,
          loading: true
        }
      }
    )

    expect(screen.getByTitle(/loading/i)).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    sut()

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})
