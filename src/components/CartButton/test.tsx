import userEvent from '@testing-library/user-event'
import { CartContextDefaultValue } from 'hooks/use-cart'
import { screen, render, CustomRenderProps } from 'utils/test-utils'

import CartButton, { CartButtonProps } from '.'

const sut = (props: CartButtonProps, renderProps: CustomRenderProps = {}) =>
  render(<CartButton {...props} />, renderProps)

describe('<CartButton />', () => {
  it('should render button to add call the method if clicked', async () => {
    const renderProps: CustomRenderProps = {
      cartProviderProps: {
        ...CartContextDefaultValue,
        isInCart: () => false,
        addToCart: jest.fn()
      }
    }
    sut(
      {
        id: '1'
      },
      renderProps
    )

    const button = screen.getByLabelText(/add to cart/i)

    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(renderProps.cartProviderProps?.addToCart).toHaveBeenCalledWith('1')
  })
  it('should render button to remove call the method if clicked', async () => {
    const renderProps: CustomRenderProps = {
      cartProviderProps: {
        ...CartContextDefaultValue,
        isInCart: () => true,
        removeFromCart: jest.fn()
      }
    }

    sut(
      {
        id: '1'
      },
      renderProps
    )

    const button = screen.getByLabelText(/remove from cart/i)

    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(renderProps.cartProviderProps?.removeFromCart).toHaveBeenCalledWith(
      '1'
    )
  })
})
