import type { FC } from 'react'

type Props = {
  email?: string
  password?: string
  username?: string
  onClick?: (value?: any) => void
}

/** default login button with user details pre-filled */
export const DefaultLoginButton: FC<Props> = (props) => {
  const { username, onClick } = props || {}
  return (
    <button
      onClick={onClick}
      type='button'
      className='inline-flex justify-center items-center gap-2 dark:border-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-slate-800 dark:bg-gray-800 shadow-sm px-4 py-2 border rounded-md w-full font-medium text-gray-700 text-sm dark:hover:text-white dark:text-gray-400 transition-all align-middle focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800'
    >
      <img
        className='inline-block rounded-full w-10 h-10 ring-2 ring-white'
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
      <span>{`Sign in as ${username || 'user A'}`}</span>
    </button>
  )
}
