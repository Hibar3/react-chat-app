import { atom } from 'recoil'
import { getToken } from './storage'

export const ATOM_KEYS = {
  CONVERSATION: 'CONVERSATION',
}

export const conversationState = atom({
  key: ATOM_KEYS.CONVERSATION,
  default: null,
})

export const myToken = getToken()
