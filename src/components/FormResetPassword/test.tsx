import 'server.mock'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'
import { render, screen, waitFor } from 'utils/test-utils'

import FormResetPassword from '.'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

let query = {}

useRouter.mockImplementation(() => ({ query }))

const sut = () => render(<FormResetPassword />)

describe('<FormResetPassword />', () => {
  it('should render the form ', () => {
    sut()

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Update password/i
      })
    ).toBeInTheDocument()
  })

  it('should show validation erros', async () => {
    sut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '456'
    )

    await userEvent.click(
      screen.getByRole('button', {
        name: /update password/i
      })
    )

    expect(
      await screen.findByText(/confirm password does not match/i)
    ).toBeInTheDocument()
  })

  it('should show error when code provider is wrong', async () => {
    query = {
      code: 'wrong_code'
    }

    sut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '123'
    )

    await userEvent.click(
      screen.getByRole('button', {
        name: /update password/i
      })
    )

    expect(
      await screen.findByText(/incorrect code provider/i)
    ).toBeInTheDocument()
  })

  it('should reset the password and sign in the user', async () => {
    query = {
      code: 'rigth_code'
    }

    sut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '123'
    )

    await userEvent.click(
      screen.getByRole('button', {
        name: /update password/i
      })
    )

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'valid@gmail.com',
        password: '123',
        callbackUrl: '/'
      })
    })
  })
})
