import { screen } from '@testing-library/react'

import { renderWithTheme } from 'utils/tests/helpers'

import ProfileMenu from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sut = (props: any) => renderWithTheme(<ProfileMenu {...props} />)

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
})
