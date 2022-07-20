import { RouterContext } from 'next/dist/shared/lib/router-context'
import { ThemeProvider } from 'styled-components'
import { CartContext, CartContextDefaultValue } from 'hooks/use-cart'
import GlobalStyles from 'styles/global'
import { light } from 'styles/themes'

/**
 * Artigo de refência para a utilização de resoluções de telas
 *
 * @see https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design
 */
export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: light.colors.white
      },
      {
        name: 'won-dark',
        value: light.colors.mainBg
      }
    ]
  }

  // viewport: {
  //   viewports: [
  //     {
  //       name: 'XX-small (phone)',
  //       styles: {
  //         width: '576px',
  //         height: '500px'
  //       }
  //     },
  //     {
  //       name: 'X-small (tablet)',
  //       styles: {
  //         width: '768px',
  //         height: '500px'
  //       }
  //     },
  //     {
  //       name: 'Small (tablet)',
  //       styles: {
  //         width: '992px',
  //         height: '500px'
  //       }
  //     },
  //     {
  //       name: 'Medium (laptop)',
  //       styles: {
  //         width: '1200px',
  //         height: '500px'
  //       }
  //     },
  //     {
  //       name: 'Large',
  //       styles: {
  //         width: '1400px',
  //         height: '500px'
  //       }
  //     }
  //   ],
  //   defaultViewport: 'Large'
  // }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={light}>
      <CartContext.Provider
        value={{
          ...CartContextDefaultValue,
          ...(context?.args?.cartContextDefaultValue || {}),
          ...context.args
        }}
      >
        <GlobalStyles removeBg />
        <Story />
      </CartContext.Provider>
    </ThemeProvider>
  )
]
