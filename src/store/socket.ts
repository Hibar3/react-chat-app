import { io } from 'socket.io-client'
import { removeLogin } from './storage'
import { myToken } from './'

const endpoint = 'http://localhost:81'

export const socket = io(`${endpoint}`, {
  autoConnect: true,
  extraHeaders: {
    authorization: `bearer ${myToken}`,
  },
})

export const socketConnect = (token?: string) => {
  // socket.auth = {
  //   token,
  // };

  socket.connect()
}

export const socketDisconnect = () => {
  socket.disconnect()

  removeLogin()
}

export const joinRoom = (id: string) => {
  console.log('joining room:', id)
  socket.emit('join', { id })
}

export const leaveRoom = (id: string) => {
  socket.emit('leave', { id })
}

export const replyMessage = (id: string, message: string) => {
  socket.emit('reply_message', {
    id,
    message: {
      body: message,
      contentType: '',
      attachments: [],
    },
  })
}
