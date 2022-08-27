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
