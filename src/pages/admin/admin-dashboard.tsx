import { Link } from 'react-router-dom'

import { Button, Card, Container } from '@/components/ui-react-aria'
import { useAuthentication } from '@/hooks/useAuth'


export default function AdminDashboard() {
  const { user, logout } = useAuthentication()

  return (
    <Container>
      <Card className='p-8'>
        <p className='mb-2 font-semibold text-destructive-600 text-sm'>Admin Dashboard</p>
        <h1 className='block font-bold text-2xl text-gray-800 sm:text-2xl dark:text-white'>
          Welcome back, {user?.email}
        </h1>
        <p className='mt-2 text-gray-700 text-lg dark:text-gray-400'>
          This should be a dashboard page for admin.
        </p>
        <div className='sm:flex-row flex-col items-center gap-2 sm:gap-3 grid mt-8 text-center'>
          <Link to='/'>
            <Button variant='destructive'>Back to homepage</Button>
          </Link>
          <Button onPress={logout}>Sign Out</Button>
        </div>
      </Card>
    </Container>
  )
}
