import { MockedProvider } from '@apollo/client/testing'
import { screen, render } from 'utils/test-utils'

import FormSignUp from '.'

// sut = system unit test
// MockedProvider => graphQL
const sut = () =>
  render(
    <MockedProvider>
      <FormSignUp />
    </MockedProvider>
  )

describe('<FormSignUp />', () => {
  it('should render the form', () => {
    const { container } = sut()

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /sign up now/i
      })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render text and link to sign in', () => {
    sut()

    expect(
      screen.getByRole('link', {
        name: /sign in/i
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
  })
})
