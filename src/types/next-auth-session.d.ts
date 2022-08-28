import { DefaultSession } from 'next-auth'

/**
 * Concatenção de 2 novos items na session feito em 'src/pages/api/auth/[...nextauth].ts'
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    jwt: string
    id: string // id do usuário
    user: DefaultSession['user']
  }
}
