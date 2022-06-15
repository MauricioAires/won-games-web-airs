import Link from 'next/link'
import { EmailIcon, LockIcon } from 'styles/icons'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { FormWrapper, FormLink } from 'components/Form'

import * as S from './styles'

const FormSignIn = () => (
  <FormWrapper>
    <form>
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        icon={<EmailIcon />}
      />
      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<LockIcon />}
      />

      <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

      <Button fullWidth size="large">
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

export default FormSignIn
