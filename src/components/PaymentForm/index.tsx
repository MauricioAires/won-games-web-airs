import React, { useEffect, useState } from 'react'
import { StripeCardElementChangeEvent, PaymentIntent } from '@stripe/stripe-js'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'

import { useCart } from 'hooks/use-cart'
import { createPaymentIntent, createPayment } from 'utils/stripe/methods'

/* eslint-disable @next/next/no-img-element */
import { AddShoppingCartIcon, ErrorCircleIcon } from 'styles/icons'

import Heading from 'components/Heading'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const { push } = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSeccret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        const data = await createPaymentIntent({
          items,
          token: session?.jwt as string
        })

        if (data.freeGames) {
          setFreeGames(true)

          return
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setFreeGames(false)
        setClientSeccret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error?.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt as string
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    // se for freeGames
    if (freeGames) {
      saveOrder()

      push('/success')
      return
    }

    const payment = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payment.error) {
      setError(`Payment failed ${payment.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      // salvar a order
      saveOrder(payment.paymentIntent)

      push('/success')
      // salvar a compra no baco do Strapi
      // redireciona para a pagina de Sucesso
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineColor="primary" lineBottom>
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              onChange={handleChange}
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px'
                  }
                }
              }}
            />
          )}

          {error && (
            <S.Error>
              <ErrorCircleIcon size={18} />
              {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>

          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <AddShoppingCartIcon />}
            disabled={!freeGames && (!!error || disabled)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export { PaymentForm }
