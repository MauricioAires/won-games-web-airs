import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import {
  FormWrapper,
  FormLoading,
  FormError,
  FormSuccess
} from 'components/Form'
import TextField from 'components/TextField'
import Button from 'components/Button'

import {
  CheckCircleOutlineIcon,
  EmailIcon,
  ErrorOutlineIcon
} from 'styles/icons'

import { FieldErros, forgotValidade } from 'utils/validations'

const FormForgotPassword = () => {
  const { query } = useRouter()
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState<FieldErros>({})

  const [values, setValues] = useState({
    email: (query.email as string) || ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      setLoading(true)

      const erros = forgotValidade(values)

      if (Object.keys(erros).length) {
        setFieldError(erros)
        setLoading(false)
        return
      }

      setFieldError({})

      // enviar um post para /forgot-password pedindo um email
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      )

      const data = await response.json()

      // Apenas para aparecer o loaading
      setLoading(false)
      setFormError('')

      // tratar error
      if (data.error) {
        setFormError(data.message[0].messages[0].message)
      } else {
        setSuccess(true)
      }
    },
    [values]
  )

  const handleInput = useCallback((field: string, value: string) => {
    setValues((s) => ({
      ...s,
      [field]: value
    }))
  }, [])

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutlineIcon />
          You just received an email!
        </FormSuccess>
      ) : (
        <>
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
              initialValue={query.email as string}
              placeholder="Email"
              type="text"
              onInputChange={(v) => handleInput('email', v)}
              icon={<EmailIcon />}
            />

            <Button type="submit" fullWidth size="large" disabled={loading}>
              {!loading ? <span>Send email</span> : <FormLoading />}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
