import { screen, render, CustomRenderProps } from 'utils/test-utils'

import mockCartList from 'components/CartList/mock'

import CartDropdown from '.'
import { CartContextDefaultValue } from 'hooks/use-cart'

const renderProps: CustomRenderProps = {
  cartProviderProps: {
    ...CartContextDefaultValue,
    items: mockCartList,
    quantity: mockCartList.length,
    total: 'R$ 330,00'
  }
}

const sut = (renderProps: CustomRenderProps = {}) =>
  render(<CartDropdown />, {
    ...renderProps
  })

describe('<CartDropdown />', () => {
  it('should render <CartIcon/> and its badge', () => {
    sut(renderProps)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${mockCartList!.length}`)).toBeInTheDocument()
  })

  it('should render Dropdown content with cart items and total', () => {
    sut(renderProps)

    expect(screen.getByText('R$ 330,00')).toBeInTheDocument()
    expect(screen.getByText(mockCartList![0].title)).toBeInTheDocument()
  })
})
