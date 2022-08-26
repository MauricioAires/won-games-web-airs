// eslint-disable-next-line @typescript-eslint/no-var-requires
// const useSession = jest.spyOn(require('next-auth/react'), 'useSession')

// const session = {
//   data: {
//     jwt: '123',
//     user: {
//       email: 'loren@gmail.com'
//     }
//   }
// }

// useSession.mockImplementation(() => session)

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => {
    return {
      data: {
        jwt: '123',
        user: {
          email: 'loren@gmail.com'
        }
      }
    }
  })
}))
