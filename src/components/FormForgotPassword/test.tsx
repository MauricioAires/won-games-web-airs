// Importação do mock do fecth e importção do MSW(Mock Service Worker)
import 'server.mock'
import { render, screen } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import FormForgotPassword from '.'

const sut = () => render(<FormForgotPassword />)

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

let query = {}

useRouter.mockImplementation(() => ({ query }))

describe('<FormForgotPassword />', () => {
  it('should render form', () => {
    sut()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /send email/i
      })
    ).toBeInTheDocument()
  })

  it('should validade the email', async () => {
    sut()

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'valid@gmail.com'
    )

    await userEvent.click(
      screen.getByRole('button', {
        name: /send email/i
      })
    )

    expect(
      await screen.findByText(/you just received an email!/i)
    ).toBeInTheDocument()
  })

  it('should show an invalid email', async () => {
    sut()

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'invalid')

    await userEvent.click(
      screen.getByRole('button', {
        name: /send email/i
      })
    )

    expect(
      await screen.findByText(/"email" must be a valid email/i)
    ).toBeInTheDocument()
  })
  it('should show an inexistent email error ', async () => {
    sut()

    await userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'false@gmail.com'
    )

    await userEvent.click(
      screen.getByRole('button', {
        name: /send email/i
      })
    )

    expect(
      await screen.findByText(/this email does not exist/i)
    ).toBeInTheDocument()
  })

  it('should autofill if comes via logged user', async () => {
    query = {
      email: 'valid@gmail.com'
    }
    sut()

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('valid@gmail.com')
  })
})
