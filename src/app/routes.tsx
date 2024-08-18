import { useRoutes } from 'react-router-dom'

import { AuthLayout } from '@/components/layouts'

import Error404 from '@/pages/404'
import { Login } from '@/pages/auth'
import Home from '@/pages/home'
import { ChatPage } from '@/pages/chat'
import { withLoggedIn, withLoggedOut } from '@/hooks/useAuth'

export const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },

    {
      element: <AuthLayout />,
      children: [
        { path: 'login', element: withLoggedOut(Login)() },
        // { path: 'recovery', element: withLoggedOut(Recovery)() },
        // { path: 'reset-password', element: withLoggedOut(ResetPassword)() },
      ],
    },
    {
      path: '/chat',
      element: withLoggedIn(ChatPage)(),
    },
    // {
    //   element: <AppLayout />,
    //   children: [
    //     { path: 'chat', element: withLoggedIn(ChatPage)() },
    //     // { path: 'dashboard', element: UserDashboard() },
    //     // { path: 'admin', element: AdminDashboard() },
    //   ],
    // },
    { path: '*', element: <Error404 /> },
  ])
}
