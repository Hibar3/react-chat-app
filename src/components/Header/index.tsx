import { ThemeSwitcher } from '@/lib/ThemeSwitcher'
import Dropdown from '../Dropdown'

/** Header Props */
type HeaderProps = {
  title?: string
  isToggled?: boolean
  onToggle?: () => void
}

export const CHeader = (props?: HeaderProps) => {
  const { title, isToggled, onToggle } = props || {}

  return (
    <header className='max-w-full max-h-16'>
      <nav className='bg-stone-800 dark:bg-gray-900'>
        <div className='px-2 sm:px-4 lg:px-2 max-w-full'>
          <div className='flex justify-between items-center h-16'>
            <div className='left-0 inset-y-0 flex items-center'></div>
            <div className='flex flex-1 justify-center sm:justify-start items-center sm:items-stretch'>
              <div className='sm:block hidden sm:ml-6'>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='hover:bg-gray-700 px-3 py-2 rounded-md font-medium text-gray-300 text-sm hover:text-white'
                  >
                    {title}
                  </a>
                </div>
              </div>
            </div>
            <div className='right-0 sm:static inset-y-0 sm:inset-auto flex items-center sm:ml-6 pr-2 sm:pr-0'>
              <ThemeSwitcher />
              <button
                type='button'
                className='relative bg-gray-800 p-1 rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-400 hover:text-white focus:outline-none'
              >
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>View notifications</span>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                  />
                </svg>
              </button>
              <div className='relative m-3'>
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default CHeader
