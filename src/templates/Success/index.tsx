import Link from 'next/link'
import { useEffect } from 'react'

import { DoneIcon } from 'styles/icons'

import { useCart } from 'hooks/use-cart'

import Base from 'templates/Base'

import Showcase from 'components/Showcase'
import { Container } from 'components/Container'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

export type SuccessTemplateProps = {
  recommendTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

import * as S from './styles'

export const Success = ({
  recommendTitle,
  recommendedHighlight,
  recommendedGames
}: SuccessTemplateProps) => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <Base>
      <Container>
        <S.Wrapper>
          <S.Heading>Your purchase was successful!</S.Heading>

          <S.CheckMark>
            <DoneIcon />
          </S.CheckMark>

          <S.Text>
            Wait for your payment details by email. Your game is now available
            for download inside your{' '}
            <Link href="/profile/orders">
              <a>Orders List</a>
            </Link>
            . Enjoy!
          </S.Text>
        </S.Wrapper>

        <Showcase
          title={recommendTitle}
          games={recommendedGames}
          highlight={recommendedHighlight}
        />
      </Container>
    </Base>
  )
}
