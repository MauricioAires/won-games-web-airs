import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import apolloCache from './apolloCache'

let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloCliente() {
  // grapQL provider
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // true
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql'
    }),
    cache: apolloCache
  })
}

export function initializeApollo(initialState = null) {
  /**
   * Modelo de coneção SINGLETON
   */
  // server para verificar se já existe uma instância, para não criar outra
  const apoloClientGlobal = apolloClient ?? createApolloCliente()

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

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}
