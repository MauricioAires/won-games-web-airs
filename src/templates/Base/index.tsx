import Footer from 'components/Footer'
import Menu from 'components/Menu'

import { Container } from 'components/Container'

import * as S from './styles'
import { useSession } from 'next-auth/react'

export type BaseTemplateProps = {
  children: React.ReactNode
}
const Base = ({ children }: BaseTemplateProps) => {
  const { data, status } = useSession()

  return (
    <S.Wrapper>
      <Container>
        <Menu username={data?.user?.name} loading={status === 'loading'} />
      </Container>

      <S.Content>{children}</S.Content>

      <S.SectionFooter>
        <Container>
          <Footer />
        </Container>
      </S.SectionFooter>
    </S.Wrapper>
  )
}

export default Base
