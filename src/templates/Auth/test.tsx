import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Auth from '.'

describe('<Auth />', () => {
  it('should render all components and children', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" />
      </Auth>
    )

    // expect(screen.getAllByLabelText(/won games/i)).toHaveLength(2)
    expect(screen.getAllByRole('img', { name: /won games/i })).toHaveLength(2)

    // Main heading
    expect(
      screen.getByRole('heading', {
        name: /All your favorite game in one place/i
      })
    ).toBeInTheDocument()

    // Subtitle
    expect(
      screen.getByRole('heading', {
        name: /WOW is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument()

    // FOoter
    expect(
      screen.getByText(/Won Games 2020 © Todos os Direitos Reservados/i)
    ).toBeInTheDocument()

    // Content title
    expect(
      screen.getByRole('heading', {
        name: /Auth title/i
      })
    ).toBeInTheDocument()

    // Childresn

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
