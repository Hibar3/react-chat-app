import { Link } from 'react-router-dom'

import { Button } from '@/components/ui-react-aria'

// Assets in public directory cannot be imported from JavaScript.
// Instead, we use `src/assets` directory.
import Logo from '../assets/images/favicon.svg'
import { ThemeSwitcher } from '@/lib/ThemeSwitcher'

export default function Home() {

  return (
    <div className='flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100'>
    <header className='flex justify-between items-center border-gray-300 dark:border-gray-700 bg-gradient-to-r from-indigo-500 dark:from-indigo-700 via-purple-500 dark:via-purple-700 to-pink-500 dark:to-pink-700 p-4 border-b w-full'>
      <img src={Logo} alt='logo' className='h-10' />
      <ThemeSwitcher />
    </header>
    <main className='flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 py-10'>
      <div className='text-center'>
        <h1 className='bg-clip-text bg-gradient-to-r from-green-400 dark:from-green-300 via-blue-500 dark:via-blue-400 to-purple-600 dark:to-purple-500 mb-4 font-extrabold text-4xl text-transparent'>
          QuickChat: Seamless, Real-Time Communication
        </h1>
        <p className='mb-4 text-lg leading-8'>
          QuickChat is a user-friendly chat application designed to facilitate real-time communication with ease and efficiency. Utilizing modern web technologies and WebSocket protocol, QuickChat ensures that messages are delivered instantly, making it perfect for both casual conversations and professional exchanges.
        </p>
        <h2 className='mb-4 font-bold text-2xl text-green-500 dark:text-green-300'>How to Use QuickChat:</h2>
        <ul className='mb-4 text-lg leading-8 list-disc list-inside'>
          <li><span className='font-semibold'>Select an Account:</span> Choose from any of the existing user accounts to log in.</li>
          <li><span className='font-semibold'>Simulate Conversations:</span> For a full conversation simulation using two accounts, log in to a second account using a different browser or incognito mode.</li>
          <li><span className='font-semibold'>Enjoy Real-Time Chatting:</span> Start chatting instantly with other users, experiencing the seamless and immediate delivery of messages.</li>
        </ul>
      </div>
      <div className='flex sm:flex-row flex-col justify-center items-center gap-4 mt-4'>
        <Link to='/login' className='inline-flex'>
          <Button variant='primary' className='bg-gradient-to-r from-green-400 hover:from-green-500 to-blue-500 hover:to-blue-600 px-4 py-2 rounded-full font-bold text-white'>
            To Login Page
          </Button>
        </Link>

      </div>
      <div className='mt-4 w-full text-center'>
        {/* <Alert variant={loggedIn ? 'info' : 'warning'} className='w-full'>
          {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
        </Alert> */}
      </div>
    </main>
  </div>
  )
}
