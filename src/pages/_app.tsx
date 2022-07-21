import NextNprogress from 'nextjs-progressbar'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { CartProvider } from 'hooks/use-cart'

import Head from 'next/head'

import { light } from 'styles/themes'
import { useApollo } from 'utils/apollo'

import GlobalStyles from 'styles/global'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={light}>
          <CartProvider>
            <Head>
              <title>Won Games</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta name="theme-color" content="#06092B" />
              <meta
                name="description"
                content="The best Game Stores in the world!"
              />
            </Head>
            <GlobalStyles />
            <NextNprogress
              color="#F231A5"
              startPosition={0.3}
              stopDelayMs={200}
              height={5}
            />
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
