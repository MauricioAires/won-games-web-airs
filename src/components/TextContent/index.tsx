import Heading from 'components/Heading'
import * as S from './styles'

export type TextContentProps = {
  title?: string
  content: string
}

const TextContent = ({ title, content }: TextContentProps) => (
  <S.Wrapper data-cy="content">
    {!!title && (
      <Heading lineColor="secondary" lineLeft>
        {title}
      </Heading>
    )}

    <div
      dangerouslySetInnerHTML={{
        __html: content
      }}
    ></div>
  </S.Wrapper>
)

export default TextContent
