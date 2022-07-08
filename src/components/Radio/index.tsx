import { InputHTMLAttributes, memo } from 'react'

import * as S from './styles'

type RadioValue = string | ReadonlyArray<string> | number

export type RadioProps = {
  onCheck?: (value?: RadioValue) => void
  label?: string
  labelColor?: 'white' | 'black'
  labelFor?: string
  value?: RadioValue
} & InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/display-name
const Radio = memo(
  ({
    label,
    onCheck,
    labelColor = 'white',
    labelFor = '',
    value,
    ...props
  }: RadioProps) => {
    const onChange = () => {
      !!onCheck && onCheck(value)
    }

    return (
      <S.Wrapper>
        <S.Input
          id={labelFor}
          type="radio"
          value={value}
          onChange={onChange}
          {...props}
        />
        {!!label && (
          <S.Label labelColor={labelColor} htmlFor={labelFor}>
            {label}
          </S.Label>
        )}
      </S.Wrapper>
    )
  }
)

export default Radio
