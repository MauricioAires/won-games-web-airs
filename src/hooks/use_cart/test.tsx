import { MockedProvider } from '@apollo/client/testing'
import { renderHook } from '@testing-library/react-hooks'
import { setStorageItem } from 'utils/localStorage'
import { CartProvider, CartProviderProps, useCart } from '.'
import { cartItems, gamesMock } from './mock'

describe('useCart', () => {
  /**
   * Está sendo skippedn porque a versão do [@testing-library/react-hooks] não
   * aceita o react 18
   */
  it.skip('should return items and its info if there are any in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    const { result, waitFor } = renderHook(() => useCart(), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(cartItems)
    })
  })
})
