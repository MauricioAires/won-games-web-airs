import * as S from './styles'

export type LineColors = 'primary' | 'secondary'
export type HeadingProps = {
  children: string
  color?: 'white' | 'black'
  lineLeft?: boolean
  lineBottom?: boolean
  size?: 'small' | 'medium' | 'huge'
  lineColor?: LineColors
}

const Heading = ({
  children,
  color = 'white',
  size = 'medium',
  lineLeft = false,
  lineBottom = false,
  lineColor = 'primary'
}: HeadingProps) => (
  <S.Wrapper {...{ color, size, lineLeft, lineBottom, lineColor }}>
    {children}
  </S.Wrapper>
)

export default Heading
