import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AppRoutes } from './routes'
import { socket } from '@/store/socket'
import { SocketContext } from '@/store/context'
import { AuthProvider } from '@/hooks/useAuth'

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <SocketContext.Provider value={socket}>
            <AppRoutes />
          </SocketContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}
