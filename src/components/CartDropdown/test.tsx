import { screen, render } from 'utils/test-utils'

import mockCartList from 'components/CartList/mock'

import CartDropdown, { CartDropdownProps } from '.'

const props: CartDropdownProps = {
  items: mockCartList,
  total: 'R$ 330,00'
}

const sut = (props: CartDropdownProps) => render(<CartDropdown {...props} />)

describe('<CartDropdown />', () => {
  it('should render <CartIcon/> and its badge', () => {
    sut(props)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${props.items!.length}`)).toBeInTheDocument()
  })

  it('should render Dropdown content with cart items and total', () => {
    sut(props)

    expect(screen.getByText('R$ 330,00')).toBeInTheDocument()
    expect(screen.getByText(props.items![0].title)).toBeInTheDocument()
  })
})
