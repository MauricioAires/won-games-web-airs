import styled, { css } from 'styled-components'
import { tint } from 'polished'
import media from 'styled-media-query'

import * as ButtonStyles from 'components/Button/styles'

export const Wrapper = styled.div``

export const Body = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    background: ${theme.colors.white};
  `}
`

export const Footer = styled.div`
  ${({ theme }) => css`
    background: ${tint(-0.2, theme.colors.lightGray)};
    color: ${theme.colors.black};
    font-weight: ${theme.font.bold};
    padding: ${theme.spacings.small};
    display: flex;
    align-items: center;

    ${ButtonStyles.Wrapper} {
      padding-left: ${theme.spacings.xxsmall};
      padding-right: ${theme.spacings.xxsmall};
      outline: 0;
    }

    ${media.lessThan('medium')`
      flex-direction: column;

      ${ButtonStyles.Wrapper} {
        margin-bottom: ${theme.spacings.xxsmall};
      }
    `}
  `}
`
