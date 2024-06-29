import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { getToken } from './storage'

export const ATOM_KEYS = {
  CONVERSATION: 'CONVERSATION',
}

export const conversationState = atom({
  key: ATOM_KEYS.CONVERSATION,
  default: null,
})

export const myToken =
  getToken() ||
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjRiYTY1MzQ2ZGVjODhiNTdkNWIyOWIiLCJpYXQiOjE3MTg0NDIxODYsImV4cCI6MTc0OTk3ODE4Nn0._hU0EaIgBq8JrANwZKveNj7iEmNrKobCJu_mNeacmfw`
