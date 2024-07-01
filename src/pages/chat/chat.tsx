// Assets in public directory cannot be imported from JavaScript.
// Instead, we use `src/assets` directory.
import { Button, Input } from '@/components/ui-react-aria'
import { socket } from '@/store/socket'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { fetchChat } from '@/api'
import { getAuthInfo, getToken } from '@/store/storage'
import { useAuthentication } from '@/hooks/useAuth'

type InputMsg = {
  room_id?: string
  content?: string
}

export default function Chat() {
  const roomId = '666c076f402a1ef76f0f74d0'
  const auth = getAuthInfo()
  const { logout } = useAuthentication();

  const [messages, setMessages] = useState<Partial<InputMsg[]>>([{}])
  const [messageInput, setMessageInput] = useState<InputMsg>({
    room_id: roomId,
    content: 'default',
  })
  const [socketIO, setSocket] = useState<Socket>(socket)

  console.log('auth', auth)
  console.log('token', getToken())

  const onGetMsgs = async () => {
    try {
      const res = await fetchChat(roomId)
      console.log(res)
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

  useEffect(() => {
    setSocket(socketIO)
    socketIO.connect()
    // socket.emit("message");
    // console.log("connecting");

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
      console.log('something')
      // socket.disconnect();
      socketIO.off('connect')
      socketIO.off('disconnect')
      socketIO.off('reply')
    }
  }, [socketIO])

  // useEffect(() => {
  //   onGetMsgs()
  //   return () => {

  //   }
  // }, [messages])

  const sendMessage = () => {
    if (socketIO) {
      socketIO.emit('message', messageInput)
      setMessageInput({
        room_id: roomId,
        content: 'default',
      })
      console.log(messages)
    }
  }

  const onSetMsgInput = (value: string) => {
    const message = {
      room_id: roomId,
      content: value,
    }

    setMessageInput(message)
  }

  const onJoinChat = (roomId?: string) => {
    socketIO.emit('joinRoom', roomId || `666c076f402a1ef76f0f74d0`)
  }

  const renderMyMsg = (msg: string, sender_id?: string) => {
    console.log('sender_id', sender_id)
    return sender_id === auth?.user?._id ? (
      <div className='col-start-6 col-end-13 p-3 rounded-lg'>
        <div className='flex flex-row-reverse justify-start items-center'>
          <div className='flex flex-shrink-0 justify-center items-center bg-indigo-500 rounded-full w-10 h-10'>
            C
          </div>
          <div className='relative bg-indigo-100 shadow mr-3 px-4 py-2 rounded-xl text-sm'>
            <p>{msg || `I'm ok what about you?`}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className='gap-y-2 grid grid-cols-12'>
        <div className='col-start-1 col-end-8 p-3 rounded-lg'>
          <div className='flex flex-row items-center'>
            <div className='flex flex-shrink-0 justify-center items-center bg-indigo-500 rounded-full w-10 h-10'>
              B
            </div>
            <div className='relative bg-white shadow ml-3 px-4 py-2 rounded-xl text-sm'>
              <p>{msg || `Hey How are you today?`}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-screen text-gray-800 antialiased'>
      <div className='flex flex-row w-full h-full overflow-x-hidden'>
        <div className='flex flex-col flex-shrink-0 bg-white py-8 pr-2 pl-6 w-64'>
          <div className='flex flex-row justify-center items-center w-full h-12'>
            <div className='flex justify-center items-center bg-indigo-100 rounded-2xl w-10 h-10 text-indigo-700'>
              <svg
                className='w-6 h-6'
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
            <div className='ml-2 font-bold text-2xl'>QuickChat</div>
          </div>
          {/* <div className='flex flex-col items-center border-gray-200 bg-indigo-100 mt-4 px-4 py-6 border rounded-lg w-full'>
            <div className='border rounded-full w-20 h-20 overflow-hidden'>
              <img
                src='https://avatars3.githubusercontent.com/u/2763884?s=128'
                alt='Avatar'
                className='w-full h-full'
              />
            </div>
            <div className='mt-2 font-semibold text-sm'>Aminos Co.</div>
            <div className='text-gray-500 text-xs'>Lead UI/UX Designer</div>
            <div className='flex flex-row items-center mt-3'>
              <div className='flex flex-col justify-center bg-indigo-500 rounded-full w-8 h-4'>
                <div className='bg-white mr-1 rounded-full w-3 h-3 self-end'></div>
              </div>
              <div className='ml-1 text-xs leading-none'>Active</div>
            </div>
          </div> */}
          <div className='flex flex-col mt-8'>
            <div className='flex flex-row justify-between items-center text-xs'>
              <span className='font-bold'>Active Conversations</span>
              <span className='flex justify-center items-center bg-gray-300 rounded-full w-4 h-4'>
                4
              </span>
            </div>
            <div className='flex flex-col space-y-1 -mx-2 mt-4 h-48 overflow-y-auto'>
              <button
                onClick={() => onJoinChat()}
                className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl'
              >
                <div className='flex justify-center items-center bg-indigo-200 rounded-full w-8 h-8'>
                  H
                </div>
                <div className='ml-2 font-semibold text-sm'>Henry Boyd</div>
              </button>
              <button className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl'>
                <div className='flex justify-center items-center bg-gray-200 rounded-full w-8 h-8'>
                  M
                </div>
                <div className='ml-2 font-semibold text-sm'>Marta Curtis</div>
                <div className='flex justify-center items-center bg-red-500 ml-auto rounded w-4 h-4 text-white text-xs leading-none'>
                  2
                </div>
              </button>
            </div>
            <button
            onClick={()=> logout()}
            className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold text-blue-700 transition duration-300 ease-in-out'>
            Logout
          </button>
          </div>
        </div>
        <div className='flex flex-col flex-auto p-6 h-full'>
          <div className='flex flex-col flex-shrink-0 flex-auto bg-gray-100 p-4 rounded-2xl h-full'>
            <div className='flex flex-col mb-4 h-full overflow-x-auto'>
              <div className='flex flex-col h-full'>
                {messages.map((data: any, index) => (
                  <div key={index}>{renderMyMsg(data?.content, data?.sender_id?._id)}</div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center bg-white px-4 rounded-xl w-full h-16'>
            <div>
              <button className='flex justify-center items-center text-gray-400 hover:text-gray-600'>
                <svg
                  className='w-5 h-5'
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
            <div className='flex-grow ml-4'>
              <div className='relative w-full'>
                <Input
                  type='text'
                  value={messageInput?.content}
                  placeholder='type something...'
                  onChange={(e) => onSetMsgInput(e?.target?.value)}
                  className='flex focus:border-indigo-300 pl-4 border rounded-xl w-full h-10 focus:outline-none'
                />
                <button className='top-0 right-0 absolute flex justify-center items-center w-12 h-full text-gray-400 hover:text-gray-600'>
                  <svg
                    className='w-6 h-6'
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
                className='flex flex-shrink-0 justify-center items-center bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-xl text-white'
              >
                <span>Send</span>
                <span className='ml-2'>
                  <svg
                    className='-mt-px w-4 h-4 transform rotate-45'
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
  )
}
