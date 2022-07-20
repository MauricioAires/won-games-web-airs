import { screen, render } from 'utils/test-utils'

import FormSignIn from '.'

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    render(<FormSignIn />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /sign in/i
      })
    ).toBeInTheDocument()
  })

  it('should render the forgot password link', () => {
    render(<FormSignIn />)

    expect(
      screen.getByRole('link', {
        name: /forgot your password\?/i
      })
    ).toBeInTheDocument()
  })

  it('should render the text and link to sign up', () => {
    render(<FormSignIn />)

    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /sign up/i
      })
    ).toBeInTheDocument()
  })
})
