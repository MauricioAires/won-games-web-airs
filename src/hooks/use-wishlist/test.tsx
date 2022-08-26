import 'session.mock'

import { renderHook, waitFor } from 'utils/test-utils'
import { MockedProvider } from '@apollo/client/testing'
import { useWishlist, WishlistProvider } from '.'
import {
  createWishlistMock,
  removeWishlistMock,
  updateWishlistMock,
  wishlistItems,
  wishlistMock
} from './mock'
import { act } from 'react-dom/test-utils'

describe('useWishlist', () => {
  it('should check if the game is in the wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), {
      wrapper
    })

    await waitFor(() => {
      expect(result.current.isInWishlist('1')).toBeTruthy()
      expect(result.current.isInWishlist('2')).toBeTruthy()
      expect(result.current.isInWishlist('3')).toBeFalsy()
    })
  })
  it('should return wishlist items', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), {
      wrapper
    })

    // it startsloading the data
    expect(result.current.loading).toBe(true)

    /**
     * hoje 24/09/2022
     *
     * O curso estava ensinando utilizadno waitForNextUpdate
     * da bibliotrca do @testing-library/react-hooks porem
     * atualmente todas as funcionalidaes dessa bibliboteca
     * foram implemntas dentro do proprio @testing-library/react
     * dessa forma a função waitForNextUpdate não existe mais
     *
     * mas a função waitFor consegue o mesmo comporatemnto
     * que é exeprear uma renderização/requisição interna
     *
     */
    // wait until get the datas
    await waitFor(() => {
      expect(result.current.items).toStrictEqual([
        wishlistItems[0],
        wishlistItems[1]
      ])
    })
  })

  it('should add item in wishlist creating a new list', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[createWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), {
      wrapper
    })

    // adicionat item
    await act(() => {
      result.current.addToWishlist('3')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[2]])
    })
  })
  it('should add item in wishlist updating the current list', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, updateWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), {
      wrapper
    })

    /**
     * Esperar que a requisição inicial traga os items
     */
    await waitFor(() => {
      expect(result.current.items).toStrictEqual([
        wishlistItems[0],
        wishlistItems[1]
      ])
    })

    // adicionat novo item
    await waitFor(() => {
      result.current.addToWishlist('3')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems)
    })
  })

  it('should remove item from wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, removeWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result } = renderHook(() => useWishlist(), {
      wrapper
    })

    /**
     * Esperar que a requisição inicial traga os items
     */
    await waitFor(() => {
      expect(result.current.items).toStrictEqual([
        wishlistItems[0],
        wishlistItems[1]
      ])
    })

    // adicionat novo item
    await act(() => {
      result.current.removeFromWihslist('1')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[1]])
    })
  })
})
