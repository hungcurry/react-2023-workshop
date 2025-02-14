import type { ChangeEvent, MouseEvent } from 'react'
import TodoList from '@/component/Todo/TodoList'
import axios, { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { VITE_BASEURL } = import.meta.env

const Todo: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  // 元件渲染時 使用useEffect自動執行一次 驗證token
  const checkOut = useCallback(async () => {
    try {
      // 取得 Cookie
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('react-token='))
        ?.split('=')[1]
      axios.defaults.headers.common.Authorization = token
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`)
      if (res?.status) {
        console.log('驗證成功', res.data)
        setNickname(res.data.nickname)
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        navigate('/week3')
      }
    }
  }, [navigate])

  // useEffect(() => {
  //   checkOut()
  // }, [checkOut])

  // ------------------------------
  // 登出
  const handleSignOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_out`)
      // 清空cookie
      document.cookie = `react-token='; expires=${new Date()}`
      alert(res.data.message)
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
    navigate('/week3')
  }
  // renderTodo
  const handleGetTodo = useCallback(async () => {
    try {
      const res = await axios.get(`${VITE_BASEURL}/todos`)
      const { data } = res.data
      console.log('res-data', data)
      setTodos(data)
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }, [])
  // addTodo
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const handleAddTodo = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!text)
      return

    console.log('text', text)
    try {
      const res = await axios.post(`${VITE_BASEURL}/todos`, {
        content: text,
      })
      if (res?.data?.status) {
        setText('')
        handleGetTodo()
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const todoProps = { todos, handleGetTodo }

  useEffect(() => {
    const init = async () => {
      await checkOut()
      await handleGetTodo()
    }
    init()
  }, [handleGetTodo, checkOut])

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>
                {nickname}
                的代辦
              </span>
            </a>
          </li>
          <li>
            <a href="#" onClick={handleSignOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>

      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項" value={text} onChange={handleInputChange} />
            <a href="#" onClick={handleAddTodo}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          {todos.length
            ? (
                <TodoList {...todoProps}></TodoList>
              )
            : (
                <div className="empty">
                  <p>目前尚無待辦事項</p>
                  <img
                    src="https://github.com/panduola666/2023_React/blob/master/src/assets/img/empty.png?raw=true"
                    alt="目前尚無待辦事項"
                  />
                </div>
              )}
        </div>
      </div>
    </div>
  )
}
export default Todo
