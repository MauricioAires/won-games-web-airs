import * as S from './styles'

export type HeadingProps = {
  children: string
  color?: 'white' | 'black'
  lineLeft?: boolean
  lineBottom?: boolean
}

const Heading = ({
  children,
  color = 'white',
  lineLeft = false,
  lineBottom = false
}: HeadingProps) => (
  <S.Wrapper {...{ color, lineLeft, lineBottom }}>{children}</S.Wrapper>
)

export default Heading
