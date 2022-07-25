import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'

import * as TextFieldStyles from 'components/TextField/styles'
import * as ButtonStyles from 'components/Button/styles'

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    ${TextFieldStyles.Wrapper} {
      margin: ${theme.spacings.xxsmall} 0;
    }

    ${ButtonStyles.Wrapper} {
      margin: ${theme.spacings.medium} auto ${theme.spacings.xsmall};
    }
  `}
`

export const FormLink = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    text-align: center;

    a {
      color: ${theme.colors.secondary};
      text-decoration: none;
      border-bottom: 0.1rem solid ${theme.colors.secondary};
      transition: color, border, ${theme.transition.fast};

      &:hover {
        color: ${darken(0.1, theme.colors.secondary)};
        border-bottom: 0.1rem solid ${darken(0.1, theme.colors.secondary)};
      }
    }
  `}
`

export const FormError = styled.div`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.small};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xsmall} 0;
    background: ${lighten(0.3, theme.colors.red)};

    svg {
      width: 1.6rem;
      margin-right: 0.4rem;
    }
  `}
`

export const FormSuccess = styled.p`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.secondary};
    font-size: ${theme.font.sizes.small};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xsmall} 0;
    background: ${lighten(0.4, theme.colors.secondary)};

    svg {
      color: ${theme.colors.secondary};
      width: 2.4rem;
    }
  `}
`

export const FormLoading = styled.img.attrs(() => ({
  src: '/img/dots.svg',
  alt: 'waiting...'
}))`
  width: 4rem;
`
