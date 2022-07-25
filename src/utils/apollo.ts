import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useMemo } from 'react'
import apolloCache from './apolloCache'
import { Session } from 'next-auth/core/types'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloCliente(session?: Session | null) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  })

  const authLink = setContext((_, { headers }) => {
    console.log('configuração do apooppp', session)
    const authorization = session?.jwt ? `Bearer ${session.jwt}` : ''

    return {
      headers: {
        ...headers,
        authorization
      }
    }
  })
  // grapQL provider
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // true
    link: authLink.concat(httpLink),
    cache: apolloCache
  })
}

export function initializeApollo(
  initialState = null,
  session?: Session | null
) {
  /**
   * Modelo de coneção SINGLETON
   */
  // server para verificar se já existe uma instância, para não criar outra
  const apoloClientGlobal = apolloClient ?? createApolloCliente(session)

  // recuperando os dados do cahce
  if (initialState) {
    apoloClientGlobal.cache.restore(initialState)
  }

  // sempre iniciando no  SSR com o cahce limpo
  if (typeof window === 'undefined') {
    return apoloClientGlobal
  }

  apolloClient = apolloClient ?? apoloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null, session?: Session | null) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  )

  return store
}
