import { createContext, useContext } from 'react'

export type TProvidUser = {
  nickname: string
  setNickname: (nickname: string) => void
}
// 宣告Context 要放在全域
export const UserContext = createContext<TProvidUser | null>(null)
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a Provider')
  }
  return context
}
// ----------------
export type TProvidProduct = {
  title: string
  price: number
}
// 宣告Context 要放在全域
export const ProductContext = createContext<TProvidProduct | null>(null)
export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a Provider')
  }
  return context
}
