import axios from 'axios'
import { myToken } from './store'
import { storeAuthInfo } from './store/storage'

export const apiEndpoint = 'http://localhost:4000'

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

export const fetchRoom = async () => {
  const url = `${apiEndpoint}/rooms`
  const response = await fetch(url)
  const data = await response.json()
  return data || []
}

// export const fetchConversations = async () => {
//   const url = `${apiEndpoint}/conversations`
//   const response = await fetch(url)
//   const data = await response.json()
//   return data || []
// }

export const fetchChat = async (roomId: string) => {
  const url = `${apiEndpoint}/rooms/${roomId}/chats`
  const response = await fetch(url, { headers: { Authorization: `Bearer ${myToken}` } })
  const data = await response
    .json()
    .then()
    .catch((err) => {
      console.error('fetchChat Error:', err)
      throw err
    })
  return data || []
}
