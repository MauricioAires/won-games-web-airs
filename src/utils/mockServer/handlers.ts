import { rest } from 'msw'

type LoginReqBody = {
  email: string
}

type ResetReqBody = {
  code: string
  password: string
  passwordConfirmation: string
}

// interceptar as chamadassw
export const handlers = [
  rest.post<LoginReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    async (req, res, ctx) => {
      const { email } = await req.json()

      // quando dar erro
      if (email === 'false@gmail.com') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'This email does not exist'
                  }
                ]
              }
            ]
          })
        )
      }
      // quando for sucesso

      return res(
        ctx.status(200),
        ctx.json({
          ok: true
        })
      )
    }
  ),

  rest.post<ResetReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    async (req, res, ctx) => {
      const { code } = await req.json()

      // código invalidp
      if (code === 'wrong_code') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'Incorrect code provider.'
                  }
                ]
              }
            ]
          })
        )
      }

      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email: 'valid@gmail.com'
          }
        })
      )
    }
  )
]
