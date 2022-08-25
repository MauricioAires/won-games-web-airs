import { MockedProvider } from '@apollo/client/testing'
import { act, renderHook, waitFor } from 'utils/test-utils'
import { setStorageItem } from 'utils/localStorage'
import { CartProvider, CartProviderProps, useCart } from '.'
import { cartItems, gamesMock } from './mock'

describe('useCart', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should return items and its info if there are any in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(cartItems)
      expect(result.current.quantity).toBe(2)
      expect(result.current.total).toBe('$21.00')
      expect(result.current.loading).toBe(false)
    })
  })

  it('should return true/false if the item is already in the cart', () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    setStorageItem('cartItems', ['1'])

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    expect(result.current.isInCart('1')).toBe(true)
    expect(result.current.isInCart('2')).toBe(false)
  })

  it('should add item in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    await act(() => {
      result.current.addToCart('1')
    })

    expect(result.current.quantity).toBe(1)

    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(
      JSON.stringify(['1'])
    )
  })

  it('should remove item in the cart', async () => {
    function wrapper({ children }: CartProviderProps) {
      return (
        <MockedProvider mocks={[gamesMock]}>
          <CartProvider>{children}</CartProvider>
        </MockedProvider>
      )
    }

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    await act(() => {
      result.current.removeFromCart('1')
    })

    expect(result.current.quantity).toBe(0)

    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(
      JSON.stringify([])
    )
  })
  it('should clear the cart', async () => {
    function wrapper({ children }: CartProviderProps) {
      return (
        <MockedProvider mocks={[gamesMock]}>
          <CartProvider>{children}</CartProvider>
        </MockedProvider>
      )
    }

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    await act(() => {
      result.current.clearCart()
    })

    expect(result.current.quantity).toBe(0)

    expect(window.localStorage.getItem('WONGAMES_cartItems')).toBe(
      JSON.stringify([])
    )
  })
})
