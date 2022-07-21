import Link from 'next/link'
import { EmailIcon, LockIcon, AccountCircleIcon } from 'styles/icons'
import Button from 'components/Button'
import TextField from 'components/TextField'

import { FormWrapper, FormLink, FormLoading } from 'components/Form'
import React, { useCallback, useState } from 'react'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/react'

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    email: '',
    password: '',
    username: ''
  })

  const [createUser, { loading, error }] = useMutation(MUTATION_REGISTER, {
    onError: (err) => console.log({ err }),
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
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Username"
          onInputChange={(v) => handleInput('username', v)}
          type="text"
          icon={<AccountCircleIcon />}
        />
        <TextField
          name="email"
          placeholder="Email"
          onInputChange={(v) => handleInput('email', v)}
          type="email"
          icon={<EmailIcon />}
        />
        <TextField
          name="password"
          placeholder="Password"
          onInputChange={(v) => handleInput('password', v)}
          type="password"
          icon={<LockIcon />}
        />
        <TextField
          name="confirm-password"
          placeholder="Confirm password"
          onInputChange={(v) => handleInput('confirmPassword', v)}
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
