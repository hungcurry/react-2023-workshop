import type { ReactNode } from 'react'
import { UserContext } from '@/composables/useContext'
import axios, { AxiosError } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { VITE_BASEURL } = import.meta.env

type TPropsProtectedRoute = {
  children: ReactNode
}

function BeforeEnter({ children }: TPropsProtectedRoute) {
  const [nickname, setNickname] = useState('')
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const navigate = useNavigate()

  const value = useMemo(() => {
    return { nickname, setNickname }
  }, [nickname, setNickname])

  // 元件渲染時 使用useEffect自動執行一次 驗證token
  const checkOut = useCallback(async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('react-token='))
        ?.split('=')[1]

      axios.defaults.headers.common.Authorization = token
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`)

      if (res?.status) {
        console.log('驗證成功', res.data)
        setNickname(res.data.nickname)
        setIsAuth(true) // ✅ 允許進入
      }
      else {
        throw new Error('驗證失敗')
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        setIsAuth(false) // ❌ 禁止進入
        navigate('/week3') // 失敗時導向登入
      }
    }
  }, [navigate])

  useEffect(() => {
    checkOut()
  }, [navigate, checkOut])

  return (
    <UserContext.Provider value={value}>
      {isAuth === null ? <div>Loading...</div> : children}
    </UserContext.Provider>
  )
}
export default BeforeEnter
