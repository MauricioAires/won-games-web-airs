import { CartContextData, CartContextDefaultValue } from 'hooks/use-cart'
import { Session } from 'next-auth/core/types'
import { CustomRenderProps, render, screen, waitFor } from 'utils/test-utils'
import PaymentForm, { PaymentFormProps } from '.'
import * as stripeMethods from 'utils/stripe/methods'
import mockItem from 'components/CartList/mock'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({ push: jest.fn() }))

// mock next link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
}))

// Mock Stripe js
jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock CardElement">{children}</div>
  },
  Elements: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Elements">{children}</div>
  },
  useStripe: jest.fn().mockReturnValue({
    confirmCardPayment: jest.fn().mockResolvedValue({
      paymentMethod: {
        card: 'card'
      }
    })
  }),
  useElements: jest.fn().mockReturnValue({
    getElement: jest.fn()
  })
}))

const sut = (props: PaymentFormProps, renderOptions: CustomRenderProps = {}) =>
  render(<PaymentForm {...props} />, renderOptions)

// create mock to createPaymentIntent method

const createPaymentintent = jest.spyOn(stripeMethods, 'createPaymentIntent')

describe('<PaymentFprm />', () => {
  let session: Session

  let cartProviderProps: CartContextData

  beforeEach(() => {
    session = {
      jwt: 'token',
      id: 'user-id',
      user: {
        email: 'won@game.com'
      },
      expires: '123456'
    }

    cartProviderProps = {
      ...CartContextDefaultValue,
      items: mockItem
    }
  })
  it('should render the component correclty', () => {
    sut({
      session
    })

    expect(
      screen.getByRole('heading', {
        name: /payment/i
      })
    ).toBeInTheDocument()

    expect(screen.getByTestId(/Mock CardElement/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /buy now/i
      })
    ).toBeDisabled()
  })
  it('should call createPayment when it renders and render free if gets freeGames', async () => {
    createPaymentintent.mockResolvedValueOnce({
      freeGames: true
    })

    sut(
      {
        session
      },
      {
        cartProviderProps
      }
    )

    await waitFor(() => {
      expect(createPaymentintent).toHaveBeenCalled()

      expect(
        screen.getByText(/Only free games, click buy and enjoy!/i)
      ).toBeInTheDocument()
    })
  })
  it('should call createPayment when it renders and render error if has issue', async () => {
    createPaymentintent.mockResolvedValueOnce({
      error: 'Error message'
    })

    sut(
      {
        session
      },
      {
        cartProviderProps
      }
    )
    expect(createPaymentintent).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText(/Error message/i)).toBeInTheDocument()
    })
  })
})
