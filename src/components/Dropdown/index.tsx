import { useState, useRef, useEffect } from 'react'
import { useAuthentication } from '@/hooks/useAuth'

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { logout, user } = useAuthentication()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='inline-block relative text-left' ref={dropdownRef}>
      <div>
        <button
          type='button'
          className='flex justify-center items-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-10 h-10 focus:outline-none'
          id='user-menu'
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className='rounded-full w-8 h-8 object-cover'
            src={user?.avatarUrl || 'https://cdn-icons-png.flaticon.com/512/4646/4646084.png'}
            alt='/'
          />
        </button>
      </div>

      {isOpen && (
        <div className='right-0 z-10 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-md ring-1 ring-black w-56 origin-top-right'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <a
              href='#'
              className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm hover:text-gray-900'
              role='menuitem'
            >
              Your Profile
            </a>
            <a
              href='#'
              className='block hover:bg-gray-100 px-4 py-2 text-gray-700 text-sm hover:text-gray-900'
              role='menuitem'
            >
              Settings
            </a>
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className='block hover:bg-gray-100 px-4 py-2 w-full text-gray-700 text-left text-sm hover:text-gray-900'
              role='menuitem'
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
