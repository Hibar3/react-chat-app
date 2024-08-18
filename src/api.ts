import axios from 'axios'
import { myToken } from './store'
import { storeAuthInfo } from './store/storage'

export const apiEndpoint = import.meta.env.VITE_GOTRUE_URL || 'http://localhost:4000'
const headers = { headers: { Authorization: `Bearer ${myToken}` } }

// set default header for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${myToken}`;

export const fetchLogin = async ({ email, password }: { email: string; password: string }) => {
  const url = `${apiEndpoint}/auth/login`
  try {
    const data = axios
      .post(url, {
        email,
        password,
      })
      .then(function (res) {
        console.log(res)
        storeAuthInfo(res?.data?.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    return data
  } catch (error) {
    return error
  }
}

export const fetchCreateRoom = async (body: CreateRoom) => {
  const url = `${apiEndpoint}/rooms`
  // const { name, members, type } = body
  try {
    const data = axios
      .post(url, body)
      .then(function (res) {
        console.log('New Chatroom created:',res?.data)
      })
      .catch(function (error) {
        console.log(error)
        throw error
      })
    return data
  } catch (error) {
    return error
  }
}

/** get chat room */
export const fetchRoom = async () => {
  const url = `${apiEndpoint}/rooms`
  const res = await axios.get(url, headers).catch(function (error) {
    console.log(error)
    throw error
  })
  return res?.data || []
}

/** get all users */
export const fetchUser = async (): Promise<Array<User>> => {
  const url = `${apiEndpoint}/users`
  const res = await axios.get(url, headers).catch(function (error) {
    console.log(error)
    throw error
  })
  const data: User[] = res?.data
  return data || []
}

/** get chat */
export const fetchChat = async (roomId: string) => {
  const url = `${apiEndpoint}/rooms/${roomId}/chats`
  const response = await fetch(url, headers)
  const data = await response
    .json()
    .then()
    .catch((err) => {
      console.error('Failed to receive chat: ', err)
      throw err
    })
  return data || []
}

/** get current chat roomId with target recipient */
export const fetchCurrentRoomId = async (
  recipientId: string
): Promise<Array<{ roomId: string }>> => {
  const url = `${apiEndpoint}/rooms/${recipientId}/current`
  const response = await fetch(url, headers)
  const data = await response
    .json()
    .then()
    .catch((err) => {
      console.error('Failed to get roomdId:', err)
      throw err
    })
  return data || []
}

//==== TYPES
export type User = {
  _id: string
  name?: string
  username?: string
  email?: string
  interests?: any[]
  createdAt?: string
  updatedAt?: string
}

export enum RoomType {
  PERSONAL = 'personal',
  GROUP = 'group',
}

export type CreateRoom = {
  name: string

  type: RoomType

  members: Partial<User>[]
}
