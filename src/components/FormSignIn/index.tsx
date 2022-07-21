import Link from 'next/link'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { FormWrapper, FormLink } from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

import { EmailIcon, LockIcon } from 'styles/icons'
import * as S from './styles'

const FormSignIn = () => {
  const [values, setValues] = useState({})
  const { push } = useRouter()

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      const result = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: '/'
      })

      if (result?.url) {
        return push(result.url)
      }

      console.log('emial ou senha inválida')
    },
    [values, push]
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
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(v) => handleInput('email', v)}
          icon={<EmailIcon />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(v) => handleInput('password', v)}
          icon={<LockIcon />}
        />

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" fullWidth size="large">
          Sign in now
        </Button>

        <FormLink>
          Don&#39;t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
