import Link from 'next/link'
import {
  EmailIcon,
  LockIcon,
  AccountCircleIcon,
  ErrorOutlineIcon
} from 'styles/icons'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { signUpValidade, FieldErros } from 'utils/validations'

import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import React, { useCallback, useState } from 'react'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/react'

const FormSignUp = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErros>({})
  const [values, setValues] = useState<
    UsersPermissionsRegisterInput & Record<string, string>
  >({
    email: '',
    password: '',
    username: '',
    confirm_password: ''
  })

  const [createUser, { loading, error }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => {
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0]
          .message
      )
    },
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          ...values,
          callbackUrl: '/'
        })
    }
  })

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      const error = signUpValidade(values)

      if (Object.keys(error).length) {
        setFieldError(error)

        return
      }
      setFieldError({})

      createUser({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password
          }
        }
      })
    },
    [values, createUser]
  )

  const handleInput = useCallback((field: string, value: string) => {
    setValues((s) => ({
      ...s,
      [field]: value
    }))
  }, [])

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutlineIcon />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          error={fieldError?.username}
          placeholder="Username"
          onInputChange={(v) => handleInput('username', v)}
          type="text"
          icon={<AccountCircleIcon />}
        />
        <TextField
          name="email"
          placeholder="Email"
          error={fieldError?.email}
          onInputChange={(v) => handleInput('email', v)}
          type="email"
          icon={<EmailIcon />}
        />
        <TextField
          name="password"
          error={fieldError?.password}
          placeholder="Password"
          onInputChange={(v) => handleInput('password', v)}
          type="password"
          icon={<LockIcon />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          error={fieldError?.confirm_password}
          onInputChange={(v) => handleInput('confirm_password', v)}
          type="password"
          icon={<LockIcon />}
        />

        <Button type="submit" fullWidth size="large" disabled={loading}>
          {!loading ? <span>Sign up now</span> : <FormLoading />}
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp
