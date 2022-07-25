import {
  signInValidade,
  signUpValidade,
  forgotValidade,
  resetPasswordValidade
} from '.'

describe('validations', () => {
  describe('signInValidade()', () => {
    it('should validate empty fields', () => {
      const values = {
        email: '',
        password: ''
      }

      expect(signInValidade(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })
    it('should return invalid emial error', () => {
      const values = {
        email: 'invalid-email',
        password: 'asdqwe123'
      }

      expect(signInValidade(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })
  })

  describe('signUpValidade()', () => {
    it('should validade empty fields', () => {
      const values = {
        username: '',
        password: '',
        email: '',
        confirm_password: 'different'
      }

      expect(signUpValidade(values)).toMatchObject({
        username: expect.any(String),
        password: expect.any(String),
        email: expect.any(String),
        confirm_password: expect.any(String)
      })
    })
    it('should return short username error', () => {
      const values = {
        username: '123',
        password: 'asdqwe123',
        email: 'ngrd@gmail.com',
        confirm_password: 'asdqwe123'
      }

      expect(signUpValidade(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`
      )
    })
    it('should return invalid email error', () => {
      const values = {
        username: 'Mauricio',
        password: 'asdqwe123',
        email: 'invalid-email',
        confirm_password: 'asdqwe123'
      }

      expect(signUpValidade(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })
    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'Mauricio',
        password: 'asdqwe123',
        email: 'ngdr@gmail.com',
        confirm_password: 'different'
      }

      expect(signUpValidade(values).confirm_password).toMatchInlineSnapshot(
        `"confirm password does not match with password"`
      )
    })
  })

  describe('forgotValidade()', () => {
    it('should validade empty fields', () => {
      const values = {
        email: ''
      }

      expect(forgotValidade(values)).toMatchObject({
        email: '"email" is not allowed to be empty'
      })
    })
    it('should return invalid emial error', () => {
      const values = {
        email: 'invalid-email'
      }

      expect(forgotValidade(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })
  })

  describe('resetPasswordValidade()', () => {
    it('should validade empty fields', () => {
      const values = {
        password: '',
        confirm_password: 'different'
      }

      expect(resetPasswordValidade(values)).toMatchObject({
        confirm_password: expect.any(String),
        password: expect.any(String)
      })
    })

    it('should return error if password does not match with confirm password', () => {
      const values = {
        password: 'asdqwe123',
        confirm_password: 'different'
      }

      expect(
        resetPasswordValidade(values).confirm_password
      ).toMatchInlineSnapshot(`"confirm password does not match with password"`)
    })

    it('should validade confirm password when empty ', () => {
      const values = {
        password: 'asdqwe123',
        confirm_password: ''
      }

      expect(
        resetPasswordValidade(values).confirm_password
      ).toMatchInlineSnapshot(
        `"\\"confirm_password\\" is not allowed to be empty"`
      )
    })
  })
})
