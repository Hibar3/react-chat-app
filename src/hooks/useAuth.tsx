import { fetchLogin } from '@/api'
import { AuthInfo, getAuthInfo, getToken, removeLogin } from '@/store/storage'
import GoTrue from 'gotrue-js'
import { FunctionComponent, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// Custom Authentication logic here
type TAuthContext = {
  loggedIn: boolean
  loggedOut: boolean
  isAdmin?: boolean
  logout: () => void
  login: (email: string, password: string) => void
  user?: AuthInfo['user'] | null
}

export const DefaultUserContext: TAuthContext = {
  user: null,
  loggedIn: false,
  loggedOut: false,
  login: () => {},
  logout: () => {},
}

export const auth = new GoTrue({
  APIUrl: import.meta.env.VITE_GOTRUE_URL,
  audience: '',
  setCookie: true,
})

export const UserContext = createContext(DefaultUserContext)

/**
 * A higher-order wrapper for the conditional route component
 * Can be used directly, or used as a building block for more
 * specific components like `withLoggedIn` or `withAdmin`
 */
export function withCondition(
  Component: FunctionComponent,
  condition: boolean,
  redirectTo: string
) {
  return function InnerComponent(props?: any) {
    return condition ? <Component {...props} /> : <Navigate to={redirectTo} replace /> // if condition is true then render as component else redirect to new page
  }
}

// /** A higher-order component implementation for Admin-only restricted pages */
// export const withAdmin = (Component: FunctionComponent) => {
//   const { loggedIn, isAdmin } = useAuthentication()
//   return withCondition(Component, loggedIn && isAdmin, '/login?as=admin')
// }

/** A higher-order wrapper, binding the "user logged in" condition and redirect */
export const withLoggedIn = (Component: FunctionComponent) => {
  console.log('line 47', useAuthentication().loggedIn)
  return withCondition(Component, useAuthentication().loggedIn, '/login') // redirects to next page after login
}

/** The inverse, showing a page only if a user is logged OUT */
export const withLoggedOut = (Component: FunctionComponent) => {
  console.log('line 47', useAuthentication().loggedIn)
  return withCondition(Component, !useAuthentication().loggedIn, '/login')
}

export function AuthProvider({ children }: { children?: ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthInfo['user'] | null>()
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        // Replace this with your actual authentication check
        // For example, you might check a token in localStorage or make an API call
        const storedUser = getAuthInfo()
        if (storedUser) {
          setUser(storedUser?.user)
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        console.error('Authentication check failed', error)
      } finally {
        setLoading(false)
      }
    }

    checkLoginStatus()
  }, [loggedIn])

  const login = async (email: string, password: string) => {
    fetchLogin({ email, password }).then((data) => {
      setLoggedIn(true)
      setLoggedOut(false)
      
  
      setLoading(!loading)
      navigate('/chat')
    })
  }

  const logout = async () => {
    setUser(null)
    removeLogin()
    setLoggedIn(false)
    setLoggedOut(true)
    navigate('/login')
  }

  const value = {
    user,
    loggedIn,
    loggedOut,
    logout,
    login,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useAuthentication = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/** get auth info */
export const getAuth = () => {
  return getAuthInfo()
}

/** check is logged in */
export const isLogging = () => {
  return getToken() !== (null || undefined)
}

//TODO: check if token expired
