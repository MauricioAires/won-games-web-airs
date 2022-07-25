import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { FormWrapper, FormLoading, FormError } from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

import { ErrorOutlineIcon, LockIcon } from 'styles/icons'

import { FieldErros, resetPasswordValidade } from 'utils/validations'
import { signIn } from 'next-auth/react'

const FormResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErros>({})
  const [values, setValues] = useState({
    password: '',
    confirm_password: ''
  })
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      setLoading(true)

      const erros = resetPasswordValidade(values)

      if (Object.keys(erros).length) {
        setFieldError(erros)
        setLoading(false)
        return
      }

      setFieldError({})

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            password: values.password,
            passwordConfirmation: values.confirm_password,
            code: query.code
          })
        }
      )

      const data = await response.json()

      if (data.error) {
        setFormError(data.message[0].messages[0].message)
        setLoading(false)
      } else {
        signIn('credentials', {
          email: data.user.email,
          password: values.password,
          callbackUrl: '/'
        })
      }
    },
    [values, query]
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
          {!loading ? <span>Update password</span> : <FormLoading />}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
