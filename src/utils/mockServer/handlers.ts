import { rest } from 'msw'

type LoginReqBody = {
  email: string
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
  )
]
