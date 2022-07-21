import styled, { css } from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 26rem;
`

export const Username = styled.span`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
  `}
`

export const Link = styled.a`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall} ${theme.spacings.small};
    transition: background, color, ${theme.transition.default};

    &:not(:last-child) {
      border-bottom: 0.1rem solid ${theme.colors.lightGray};
    }

    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    }

    > svg {
      width: 2.4rem;
      height: 2.4rem;
    }

    > span {
      margin-left: ${theme.spacings.small};
    }
  `}
`
