import axios, { AxiosError } from 'axios'
import { ChangeEvent, MouseEvent } from 'react'
import { useEffect, useState , useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoList from "@/component/Todo/TodoList"
const { VITE_BASEURL } = import.meta.env

const Todo: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [tag, setTag] = useState('全部')
  const navigate = useNavigate()

  // 驗證
  const checkOut = useCallback(async () => {
    try {
      // 取得 Cookie
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1]
      axios.defaults.headers.common['Authorization'] = token
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`)
      if(res?.status) {
        console.log(`驗證成功`, res.data)
        setNickname(res.data.nickname)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
        navigate('/week3/Login')
      }
    }
  }, [navigate])

  useEffect(() => {
    checkOut()
  }, [checkOut])

  // 登出
  const handleSignOut = async (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${VITE_BASEURL}/users/sign_out`)
      // 清空cookie
      document.cookie = `token='; expires=${new Date()}`
      alert(res.data.message);
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
    navigate('/week3');
  }
  const handleChangeTag = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTag((e.target as HTMLElement)?.textContent || "");
  }

  // renderTodo
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  const handleAddTodo = async (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // console.log(`text`, text)
    try {
      const res = await axios.post(`${VITE_BASEURL}/todos`, {
        content: text,
      })
      if (res?.data?.status) {
        setText('')
        handleGetTodo()
      }
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handleGetTodo = useCallback(async () => {
    try {
      const res = await axios.get(`${VITE_BASEURL}/todos`)
      const { data } = res.data
      setTodos(data);
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }, [])

  useEffect(() => {
    handleGetTodo()
  }, [tag , handleGetTodo])


  const todoProps = { tag, todos, handleChangeTag, handleGetTodo }

  return (
    <div id='todoListPage' className='bg-half'>
      <nav>
        <h1><a href='#'>ONLINE TODO LIST</a></h1>
        <ul>
          <li className='todo_sm'>
            <a href='#'><span>{ nickname }的代辦</span></a>
          </li>
          <li>
            <a href='#' onClick={ handleSignOut }>登出</a>
          </li>
        </ul>
      </nav>

      <div className='conatiner todoListPage vhContainer'>
        <div className='todoList_Content'>
          <div className='inputBox'>
            <input type='text' placeholder='請輸入待辦事項' 
              value={ text } onChange={ handleInputChange }
            />
            <a href='#' onClick={ handleAddTodo }><i className='fa fa-plus'></i></a>
          </div>
          {
            todos.length 
            ? <TodoList { ...todoProps }></TodoList>
            : <div className='empty'>
                <p>目前尚無待辦事項</p>
                <img src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/empty.png?raw=true' alt='目前尚無待辦事項'/>
              </div>
          }
        </div>
      </div>

    </div>
  )
}
export default Todo
