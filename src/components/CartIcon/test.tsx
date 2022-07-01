import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import CartIcon, { CartIconProps } from '.'

const props: CartIconProps = {}

const sut = (props: CartIconProps) => renderWithTheme(<CartIcon {...props} />)

describe('<CartIcon />', () => {
  it('should render without badge', () => {
    sut(props)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })
  it('should render with badge', () => {
    sut({
      quantity: 12
    })
    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument()
    expect(screen.getByText(/12/i)).toBeInTheDocument()
  })

  it('should render with badge only if has positive number', () => {
    sut({
      quantity: -1
    })
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/-1/i)).not.toBeInTheDocument()
  })
})
