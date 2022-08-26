import 'session.mock'

import userEvent from '@testing-library/user-event'

import { WishlistContextData, WishlistDefaultValues } from 'hooks/use-wishlist'
import { screen, render, CustomRenderProps } from 'utils/test-utils'

import WishlistButton, { WishlistButtonProps } from '.'

const sut = (
  props: WishlistButtonProps,
  renderOptions: CustomRenderProps = {}
) => render(<WishlistButton {...props} />, renderOptions)

describe('<WishlistButton />', () => {
  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => false
    }
    sut(
      {
        id: '1'
      },
      {
        wishlistProviderProps
      }
    )

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render a button to add to wishlist', () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => true
    }
    sut(
      {
        id: '1'
      },
      {
        wishlistProviderProps
      }
    )

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should render a button with add to wishlist text', () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => false
    }
    sut(
      {
        id: '1',
        hasText: true
      },
      {
        wishlistProviderProps
      }
    )

    expect(
      screen.getByRole('button', {
        name: /add to wishlist/i
      })
    ).toBeInTheDocument()
  })

  it('should render a button with remove from wishlist text', () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => true
    }
    sut(
      {
        id: '1',
        hasText: true
      },
      {
        wishlistProviderProps
      }
    )

    expect(
      screen.getByRole('button', {
        name: /remove from wishlist/i
      })
    ).toBeInTheDocument()
  })

  it('should not render if not logged', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useSession = jest.spyOn(require('next-auth/react'), 'useSession')

    useSession.mockImplementationOnce(() => [null])

    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => true
    }
    sut(
      {
        id: '1',
        hasText: true
      },
      {
        wishlistProviderProps
      }
    )

    expect(
      screen.queryByRole('button', {
        name: /remove from wishlist/i
      })
    ).not.toBeInTheDocument()
  })

  it('should add to item in wishlist', async () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => false,
      addToWishlist: jest.fn()
    }
    sut(
      {
        id: '1',
        hasText: true
      },
      {
        wishlistProviderProps
      }
    )

    const button = screen.getByRole('button', {
      name: /add to wishlist/i
    })

    await userEvent.click(button)

    expect(wishlistProviderProps.addToWishlist).toBeCalledWith('1')
  })

  it('should remove item from wishlist', async () => {
    const wishlistProviderProps: WishlistContextData = {
      ...WishlistDefaultValues,
      isInWishlist: () => true,
      removeFromWihslist: jest.fn()
    }
    sut(
      {
        id: '1',
        hasText: true
      },
      {
        wishlistProviderProps
      }
    )

    const button = screen.getByRole('button', {
      name: /remove from wishlist/i
    })

    await userEvent.click(button)

    expect(wishlistProviderProps.removeFromWihslist).toBeCalledWith('1')
  })
})
