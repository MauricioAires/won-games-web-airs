import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import UserDropdown, { UserDropdownProps } from '.'

const props: UserDropdownProps = {
  username: 'Mauricio'
}

const sut = (props: UserDropdownProps) =>
  renderWithTheme(<UserDropdown {...props} />)

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
      screen.getByRole('link', {
        name: /sign out/i
      })
    ).toBeInTheDocument()
  })
})
