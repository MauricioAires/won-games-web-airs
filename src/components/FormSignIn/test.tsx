import { MockedProvider } from '@apollo/client/testing'
import { screen, render } from 'utils/test-utils'

import FormSignIn from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn
  }))
}))

const sut = () =>
  render(
    <MockedProvider>
      <FormSignIn />
    </MockedProvider>
  )

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    sut()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /sign in/i
      })
    ).toBeInTheDocument()
  })

  it('should render the forgot password link', () => {
    sut()

    expect(
      screen.getByRole('link', {
        name: /forgot your password\?/i
      })
    ).toBeInTheDocument()
  })

  it('should render the text and link to sign up', () => {
    sut()

    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /sign up/i
      })
    ).toBeInTheDocument()
  })
})
