import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import mockPaymentOptions from './mock'
import PaymentOptions, { PaymentOptionsProps } from '.'

const props: PaymentOptionsProps = {
  cards: mockPaymentOptions,
  handlePayment: jest.fn
}

const sut = (props: PaymentOptionsProps) =>
  renderWithTheme(<PaymentOptions {...props} />)

describe('<PaymentOptions />', () => {
  it('should render the saved card options and the add new card button ', () => {
    sut(props)

    expect(screen.getByLabelText(/4325/)).toBeInTheDocument()
    expect(screen.getByLabelText(/4326/)).toBeInTheDocument()
    expect(screen.getByText(/add a new credit card/i)).toBeInTheDocument()
  })

  it('should handle select card when clicking on the label', async () => {
    sut(props)

    await userEvent.click(screen.getByLabelText(/4325/))

    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: /4325/
        })
      ).toBeChecked()
    })
  })

  it('should not call handlePayment when button is disabled ', async () => {
    const handlePayment = jest.fn()

    sut({
      ...props,
      handlePayment: handlePayment
    })

    await userEvent.click(
      screen.getByRole('button', {
        name: /buy now/i
      })
    )

    expect(handlePayment).not.toHaveBeenCalled()
  })

  it('should call handlePayment when credit card is selected', async () => {
    const handlePayment = jest.fn()

    sut({
      ...props,
      handlePayment: handlePayment
    })

    // Selecionar um cartão
    await userEvent.click(screen.getByLabelText(/4325/))

    // clicar no botão de comprar

    await userEvent.click(
      screen.getByRole('button', {
        name: /buy now/i
      })
    )

    expect(handlePayment).toHaveBeenCalled()
  })
})
