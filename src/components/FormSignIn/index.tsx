import Link from 'next/link'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

import { EmailIcon, LockIcon, ErrorOutlineIcon } from 'styles/icons'
import * as S from './styles'
import { FieldErros, signInValidade } from 'utils/validations'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErros>({})
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { push, query } = router

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      setLoading(true)

      const erros = signInValidade(values)

      console.log(erros)
      if (Object.keys(erros).length) {
        setFieldError(erros)
        setLoading(false)
        return
      }

      setFieldError({})

      const result = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
      })

      if (result?.url) {
        return push(result.url)
      }

      /**
       * Apenas para aparecer o loaading
       */
      setTimeout(() => {
        setLoading(false)
      }, 100)

      setFormError('username or password is invalid')
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
      {!!formError && (
        <FormError>
          <ErrorOutlineIcon />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          error={fieldError?.email}
          placeholder="Email"
          type="email"
          onInputChange={(v) => handleInput('email', v)}
          icon={<EmailIcon />}
        />
        <TextField
          name="password"
          error={fieldError?.password}
          placeholder="Password"
          type="password"
          onInputChange={(v) => handleInput('password', v)}
          icon={<LockIcon />}
        />

        <Link href="/forgot-password" passHref>
          <S.ForgotPassword>Forgot your password?</S.ForgotPassword>
        </Link>

        <Button type="submit" fullWidth size="large" disabled={loading}>
          {!loading ? <span>Sign in now</span> : <FormLoading />}
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
