import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloCliente() {
  // grapQL provider
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // true
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql'
    }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = {}) {
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

export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}
