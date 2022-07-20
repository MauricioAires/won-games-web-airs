import { CartContextDefaultValue } from 'hooks/use-cart'
import { screen, render, CustomRenderProps } from 'utils/test-utils'

import CartIcon from '.'

const sut = (props: CustomRenderProps) =>
  render(<CartIcon />, {
    ...props
  })

describe('<CartIcon />', () => {
  it('should render without badge', () => {
    sut({
      cartProviderProps: {
        ...CartContextDefaultValue,
        quantity: 0
      }
    })

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })
  it('should render with badge', () => {
    sut({
      cartProviderProps: {
        ...CartContextDefaultValue,
        quantity: 3
      }
    })
    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument()
    expect(screen.getByText(/3/i)).toBeInTheDocument()
  })
})
