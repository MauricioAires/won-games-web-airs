/* eslint-disable @next/next/no-img-element */
import { AddShoppingCartIcon } from 'styles/icons'

import Heading from 'components/Heading'

import * as S from './styles'
import Button from 'components/Button'

const PaymentForm = () => {
  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineColor="primary" lineBottom>
          Payment
        </Heading>
      </S.Body>
      <S.Footer>
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>

        <Button fullWidth icon={<AddShoppingCartIcon />}>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export { PaymentForm }
