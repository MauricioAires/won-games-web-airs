import joi from 'joi'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'

const fieldsValidations = {
  username: joi.string().min(5).required(),
  email: joi
    .string()
    .email({
      tlds: {
        allow: false
      }
    })
    .required(),
  password: joi.string().required(),
  confirm_password: joi
    .string()
    .valid(joi.ref('password'))
    .required()
    .messages({
      'any.only': 'confirm password does not match with password'
    })
}

export function signUpValidade(values: UsersPermissionsRegisterInput) {
  const schema = joi.object(fieldsValidations)

  return getFieldErros(
    schema.validate(values, {
      abortEarly: false
    })
  )
}

export type FieldErros = Record<string, string>

function getFieldErros(objectErros: joi.ValidationResult) {
  const erros: FieldErros = {}

  if (objectErros.error) {
    objectErros.error.details.forEach((err) => {
      erros[err.path.join('')] = err.message
    })
  }

  return erros
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>

export function signInValidade(values: SignInValues) {
  const { email, password } = fieldsValidations

  const schema = joi.object({
    email,
    password
  })

  return getFieldErros(
    schema.validate(values, {
      // Se o abortEarly estivesse como true
      // ele iria parar no primeiro erro
      // dessa forma ele irá coletar todoso os erros e
      // retornar para o usuário
      abortEarly: false
    })
  )
}

type ForgotValidade = Pick<UsersPermissionsRegisterInput, 'email'>
export function forgotValidade(values: ForgotValidade) {
  const { email } = fieldsValidations

  const schema = joi.object({
    email
  })

  return getFieldErros(
    schema.validate(values, {
      abortEarly: false
    })
  )
}

type ResetPasswordValidade = Pick<UsersPermissionsRegisterInput, 'password'> &
  Record<'confirm_password', string>

export function resetPasswordValidade(values: ResetPasswordValidade) {
  const { password, confirm_password } = fieldsValidations

  const schema = joi.object({
    password,
    confirm_password
  })

  return getFieldErros(
    schema.validate(values, {
      abortEarly: false
    })
  )
}
