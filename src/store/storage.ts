export interface AuthInfo {
  user: {
    _id: string
    name: string
    username: string
    email: string
    avatarUrl?: string
  }
  token: string
}

export const storeAuthInfo = (payload: AuthInfo) => {
  localStorage.setItem('auth', JSON.stringify(payload))
}

export const getAuthInfo = () => {
  const data: any = localStorage.getItem('auth')
  return data ? (JSON.parse(data) as AuthInfo) : null
}

export const getToken = () => {
  const data: any = localStorage.getItem('auth')
  const token = (JSON.parse(data) as AuthInfo)?.token
  return token
}

export const removeLogin = async () => {
  localStorage.removeItem('auth')
}
