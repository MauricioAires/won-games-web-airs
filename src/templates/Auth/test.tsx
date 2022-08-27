import { screen, render } from 'utils/test-utils'

import Auth from '.'

describe('<Auth />', () => {
  it('should render all components and children', () => {
    render(
      <Auth title="Auth title">
        <input type="text" />
      </Auth>
    )

    expect(screen.getAllByRole('img', { name: 'Won Games' })).toHaveLength(2)

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
