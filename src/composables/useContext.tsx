import { createContext, useContext } from 'react'

type TUser = {
  nickname: string
  setNickname: (nickname: string) => void
}

export const UserContext = createContext<TUser | null>(null)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
