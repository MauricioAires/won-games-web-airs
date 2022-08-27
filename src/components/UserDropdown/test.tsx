import { screen, render } from 'utils/test-utils'

import userEvent from '@testing-library/user-event'

import UserDropdown, { UserDropdownProps } from '.'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

jest.mock('next-auth/react', () => ({
  signOut: () => {
    return {
      url: '/'
    }
  }
}))

const props: UserDropdownProps = {
  username: 'Mauricio'
}

const sut = (props: UserDropdownProps) => render(<UserDropdown {...props} />)

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    sut(props)

    expect(screen.getByText(/mauricio/i)).toBeInTheDocument()
  })
  it('should render the menu', async () => {
    sut(props)

    // open menu
    await userEvent.click(screen.getByText(/mauricio/i))

    expect(
      screen.getByRole('link', {
        name: /my profile/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /wishlist/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /sign out/i
      })
    ).toBeInTheDocument()
  })

  it('shound redirect to home page when click signOut', async () => {
    sut(props)

    // open menu
    await userEvent.click(screen.getByText(/mauricio/i))

    const signOutButton = screen.getByRole('button', {
      name: /Sign out/i
    })

    await userEvent.click(signOutButton)

    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
