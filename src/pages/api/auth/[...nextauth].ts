import NextAuth from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

const options: NextAuthOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',
      credentials: {},
      async authorize({ email, password }) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            method: 'POST',
            body: new URLSearchParams({
              identifier: email,
              password
            })
          }
        )

        const data = await response.json()

        if (data.user) {
          return {
            ...data.user,
            jwt: data.jwt
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt
      session.id = token.id

      // Apenas duurante o desenvolviemtno
      console.log('[ LOG - JWT ]', token.jwt)

      return Promise.resolve(session)
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.username
        token.jwt = user.jwt
      }

      return Promise.resolve(token)
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
