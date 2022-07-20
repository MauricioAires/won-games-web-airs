import { screen, render } from 'utils/test-utils'

import ProfileMenu, { ProfileMenuProps } from '.'

const sut = (props: ProfileMenuProps) => render(<ProfileMenu {...props} />)

describe('<ProfileMenu />', () => {
  it('should render the heading', () => {
    sut({})

    expect(
      screen.getByRole('link', {
        name: /my profile/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /my cards/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /my orders/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /sign out/i
      })
    ).toBeInTheDocument()
  })

  it('should render the menu with an active link defined', () => {
    sut({
      activeLink: '/profile/cards'
    })

    expect(
      screen.getByRole('link', {
        name: /my cards/i
      })
    ).toHaveStyle({
      background: '#F231A5',
      color: '#FAFAFA'
    })
  })
})
