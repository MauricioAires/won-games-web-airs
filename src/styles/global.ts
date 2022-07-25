import { memo } from 'react'
import { createGlobalStyle, css } from 'styled-components'

type GlobalStylesProps = {
  removeBg?: boolean
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  
  
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local(''),url('/fonts/poppins-v19-latin-300.woff2') format('woff2')
       
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v19-latin-regular.woff2') format('woff2')
      
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local(''),
       url('/fonts/poppins-v19-latin-600.woff2') format('woff2')

}

  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before, &::after {
      box-sizing: inherit;
    }
  }


  ${({ theme, removeBg }) => css`
    html {
      font-size: 62.5%;
    }

    button {
      font-family: inherit;
    }
    body {
      font-family: ${theme.font.family};

      ${!removeBg &&
      css`
        background-color: ${theme.colors.mainBg};
      `}
    }
  `}


`
export default memo(GlobalStyles)
