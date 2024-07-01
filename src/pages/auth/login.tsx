import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { DefaultLoginButton } from '@/components/social-button'
import { Alert, Card } from '@/components/ui-react-aria'
import { fetchLogin } from '@/api'
import { getAuthInfo } from '@/store/storage'
import { useAuthentication } from '@/hooks/useAuth'

interface LoginTypes {
  email: string
  password: string
}

export default function Login() {
  const { loggedOut, login } = useAuthentication()
  const [failed, setFailed] = useState<string | null>()
  const auth = getAuthInfo()
  const navigate = useNavigate()
  console.log(auth)

  const {
    // register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<LoginTypes>()

  const handleLogin = (data: LoginTypes) => {
    const { email, password } = data
    login(email, password)
    setFailed(null)
    navigate('/chat')
  }

  return (
    <main className='mx-auto p-6 w-full max-w-md'>
      {failed && <Alert variant='destructive'>{failed}</Alert>}
      {loggedOut && (
        <Alert variant='success'>
          <span className='font-bold'>Goodbye!</span> Your session has been terminated.
        </Alert>
      )}

      <Card>
        <div className='sm:px-7 sm:py-8 p-4'>
          <div className='space-y-2'>
            <DefaultLoginButton
              username='Eddie'
              onClick={
                () => 
                handleLogin({
                  email: 'test@email.com',
                  password: 'abc1d234',
                })
              }
            />
            <DefaultLoginButton
              username='Harold'
              onClick={
                () =>   handleLogin({
                  email: 'demo@email.com',
                  password: 'abc1d234',
                })
              }
            />
          </div>

          {/* <HorizontalDivider label='Or' />

          <form autoComplete='off' onSubmit={handleSubmit(handleLogin)}>
            <div className='gap-y-4 grid'>
              <div>
                <TextField
                  label='Email address'
                  // {...register('email', { required: true })}
                  // error={errors.email}
                />
              </div>

              <TextField
                label='Password'
                // disabled={isSubmitting}
                // {...register('password', { required: true })}
                // error={errors.password}
                // withResetLink
              />
            </div>
            <div className='grid mt-6 w-full'>
              <Button
                type='submit'
                variant='primary'
                // disabled={isSubmitting}
                // loading={isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className='mt-8 text-center'>
            <p className='text-gray-600 text-sm dark:text-gray-400'>
              <Link to='/' className='text-blue-600 hover:underline decoration-2'>
                &larr; Go back to homepage
              </Link>
            </p>
          </div> */}
        </div>
      </Card>
    </main>
  )
}
