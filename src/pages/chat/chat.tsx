// Assets in public directory cannot be imported from JavaScript.
// Instead, we use `src/assets` directory.
import { Button, Input } from '@/components/ui-react-aria'
import { socket } from '@/store/socket'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import {
  CreateRoom,
  fetchChat,
  fetchCreateRoom,
  fetchCurrentRoomId,
  fetchRoom,
  fetchUser,
  RoomType,
  User,
} from '@/api'
import { getAuthInfo, getToken } from '@/store/storage'
import { useAuthentication } from '@/hooks/useAuth'
import CHeader from '@/components/Header'
import map from 'lodash/map'
import size from 'lodash/size'

type InputMsg = {
  room_id?: string
  content?: string
}
// TODO: set default room

export default function Chat() {
  const [roomId, setRoomId] = useState<string>('')
  const auth = getAuthInfo()
  const { logout } = useAuthentication()

  const [messages, setMessages] = useState<Partial<InputMsg[]>>([{}])
  const [messageInput, setMessageInput] = useState<InputMsg>({
    room_id: roomId,
    content: 'Placeholder',
  })
  const [socketIO, setSocket] = useState<Socket>(socket)
  const [users, setUsers] = useState<User[]>([])
  const [currentRoomId, setCurrentRoomId] = useState<{ roomId: string }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  //=====FUNCTIONS
  const getChatrooms = async () => {
    const chatRooms = await fetchRoom()
    return chatRooms
  }

  const onGetUsers = async () => {
    const user = (await fetchUser()) || []
    // console.log('Users:', user)
    setUsers(user)
    setLoading(false)
    return user
  }

  const onGetMsgs = async () => {
    try {
      const res = await fetchChat(roomId)
      // console.log(res)
      const sortedMessages = res?.sort((a: { createdAt: Date }, b: { createdAt: Date }) => {
        const left: Date | number = new Date(a?.createdAt)
        const right: Date | number = new Date(b?.createdAt)
        return Number(left) - Number(right)
      })
      setMessages(sortedMessages)
      return res
    } catch (error) {
      throw error
    }
  }

  const onGetCurrentChatroom = async (id: string) => {
    const res = await fetchCurrentRoomId(id)
    console.log('Current room:', res)
    setCurrentRoomId(res)
    return res
  }

  const onCreateRoom = async (value: CreateRoom) => {
    const res = await fetchCreateRoom(value)
    return res
  }

  const sendMessage = () => {
    if (socketIO) {
      socketIO.emit('message', messageInput)
      setMessageInput({
        room_id: roomId,
        content: '',
      })
      console.log('Sent message', messages)
    }
  }

  const onSetMsgInput = (value: string) => {
    const message = {
      room_id: roomId,
      content: value,
    }

    setMessageInput(message)
  }

  const onJoinChat = async (recipeintId: string, recipeintName?: string) => {
    if (recipeintId) {
      const newRoomId = await onGetCurrentChatroom(recipeintId)

      if (size(newRoomId) > 0) {
        setRoomId(newRoomId?.[0]?.roomId)
        socketIO.emit('joinRoom', newRoomId?.[0]?.roomId)
      } else {
        // TODO: if room not found then create new room via POST:/rooms api
        const value = {
          name: `${recipeintName}+${auth?.user?.name}`,
          type: RoomType.PERSONAL,
          members: [{ _id: recipeintId }, { _id: auth?.user?._id }],
        }
        onCreateRoom(value)
      }
      return newRoomId?.[0]?.roomId
    }
  }

  //==== useEffect =====
  useEffect(() => {
    setSocket(socketIO)
    socketIO.connect()
    // socket.emit("message");

    socketIO.on('joinRoom', (data) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      console.log('joined room', data)
    })

    socketIO.on('reply', (arg) => {
      // setMessages((prevMessages) => [...prevMessages, arg?.message])
      onGetMsgs()
      console.log('connected', arg?.message)
    })

    return () => {
      console.log('connected ot websocket')
      // socket.disconnect();
      socketIO.off('connect')
      socketIO.off('disconnect')
      socketIO.off('reply')
    }
  }, [socketIO])

  useEffect(() => {
    onGetMsgs()
    onGetUsers()
    return () => {}
  }, [messages, roomId])

  //====RENDER
  // TODO: hide ownself from chat
  const renderUsers = () => {
    const filteredUsers = users.filter((user) => user._id !== auth?.user._id) // remove ownself from list

    return (
      <div className='-mx-2 mt-4 flex h-48 flex-col space-y-1 '>
        {map(filteredUsers, (user, index) => (
          <button
            key={index}
            onClick={async () => onJoinChat(user?._id, user?.username)}
            className='flex flex-row items-center rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-600'>
              {user?.username?.charAt(0)}
            </div>
            <p className='ml-2 text-sm font-semibold dark:text-gray-200'>{user?.name}</p>
          </button>
        ))}
      </div>
    )
  }

  const renderMyMsg = (msg: string, sender_id?: string) => {
    // console.log('sender_id', sender_id)
    return sender_id === auth?.user?._id ? (
      <div className='col-start-6 col-end-13 rounded-lg p-3'>
        <div className='flex flex-row-reverse items-center justify-start'>
          <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500'>
            Me
          </div>
          <div className='relative mr-3 rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow'>
            <p>{msg || `Sender`}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className='grid grid-cols-12 gap-y-2'>
        <div className='col-start-1 col-end-8 rounded-lg p-3'>
          <div className='flex flex-row items-center'>
            <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500'>
              U
            </div>
            <div className='relative ml-3 rounded-xl bg-white px-4 py-2 text-sm shadow'>
              <p>{msg || `Recipient`}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=''>
      <CHeader />
      <div className='h-screen max-h-lvh text-gray-800 antialiased'>
        <div className='flex h-full w-full flex-row overflow-x-hidden'>
          <div className='flex w-64 flex-shrink-0 flex-col bg-white py-4 pl-6 pr-2 dark:bg-gray-800'>
            <div className='flex h-12 w-full flex-row items-center justify-center'>
              <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                  ></path>
                </svg>
              </div>
              <div className='ml-2 text-2xl font-bold dark:text-gray-200'>QuickChat</div>
            </div>
            <div className='mt-8 flex flex-col'>
              <div className='flex flex-row items-center justify-between text-xs'>
                <span className='font-bold dark:text-gray-200'>Active Conversations</span>
                <span className='flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600'>
                  4
                </span>
              </div>
              {renderUsers()}
            </div>
          </div>
          <div className='flex h-full max-h-screen flex-auto flex-col p-4'>
            <div className='flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-gray-100 p-4 dark:bg-gray-700'>
              <div className='mb-4 flex flex-col  overflow-x-auto'>
                <div className='flex flex-col '>
                  {messages.map((data: any, index) => (
                    <div key={index}>{renderMyMsg(data?.content, data?.sender_id?._id)}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex h-16 w-full flex-row items-center rounded-xl bg-white px-4 dark:bg-gray-800'>
              <div>
                <button className='flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400'>
                  <svg
                    className='h-5 w-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                    ></path>
                  </svg>
                </button>
              </div>
              <div className='ml-4 flex-grow'>
                <div className='relative w-full'>
                  <Input
                    type='text'
                    value={messageInput?.content}
                    placeholder='type something...'
                    onChange={(e) => onSetMsgInput(e?.target?.value)}
                    className='flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none dark:border-gray-600 dark:focus:border-indigo-500'
                  />
                  <button className='absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='ml-4'>
                <Button
                  onPress={sendMessage}
                  className='flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700'
                >
                  <span>Send</span>
                  <span className='ml-2'>
                    <svg
                      className='-mt-px h-4 w-4 rotate-45 transform'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      ></path>
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
