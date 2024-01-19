import axios, { AxiosError } from 'axios'
import { ChangeEvent, MouseEvent } from 'react'
import { useEffect, useMemo, useState , useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
const { VITE_BASEURL } = import.meta.env

type obj = { 
  content: string,
  createTime: string,
  id: string,
  status: boolean,
}
type TodoType = { 
  tag: string, 
  todos: obj[],
  handleChangeTag: (e:MouseEvent<HTMLAnchorElement>) => void,
  handleGetTodo: () => void,
}
// TodoList
const TodoList = ({ tag, handleChangeTag, todos, handleGetTodo }: TodoType) => {
  const filterTodo = useMemo(() => {
    return todos.filter((item) => {
      switch (tag) {
        case '全部':
          return item
        case '待完成':
          return !item.status
        case '已完成':
          return item.status
      }
    })
  }, [todos ,tag])
  const undoneTodo = useMemo(() => {
    return todos.filter((item) => {
      return !item.status
    })
  }, [todos])

  const handleToggleState = async (id:string) => {
    try {
      const res = await axios.patch(`${VITE_BASEURL}/todos/${id}/toggle`)
      if(res?.data?.status) handleGetTodo()
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handleDelTodo = async (e:MouseEvent<HTMLAnchorElement>, id:string) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`${VITE_BASEURL}/todos/${id}`);
      if(res?.data?.status) handleGetTodo()
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handleClearTodo = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const finishTodos = todos.filter((todo) => {
      if(todo.status) handleDelTodo(e ,todo.id)
      return todo.status === true
    })
    // ~console.log(`finishTodos`, finishTodos);
    if (finishTodos.length === 0) {
      alert('當前沒有已完成項目')
      return
    }
    // const deleteTodo = async (id:string) => {
    //   try {
    //     const res = await axios.delete(`${VITE_BASEURL}/todos/${id}`);
    //     if (res?.data?.status) handleGetTodo()
    //   } 
    //   catch (error: unknown) {
    //     if (error instanceof AxiosError) {
    //       console.log(error?.response?.data?.message)
    //     }
    //   }
    // }
  }
  return (
    <div className='todoList_list'> 
      <ul className='todoList_tab'>
        <li>
          <a href='#'className={ tag === '全部' ? 'active' : '' } onClick={ handleChangeTag} >全部</a>
        </li>
        <li>
          <a href='#' className={ tag === '待完成' ? 'active' : '' } onClick={ handleChangeTag }>待完成</a>
        </li>
        <li>
          <a href='#' className={ tag === '已完成' ? 'active' : '' } onClick={ handleChangeTag }>已完成</a>
        </li>
      </ul>
      {/* ----- */}
      <div className='todoList_items'>
        <ul className='todoList_item'>
          { 
            filterTodo.map((todo ,idx) => (
                <li key={ todo.id }>
                  <input
                    className='todoList_input' id={ idx.toString() } type='checkbox'
                    value={ todo.status.toString() } checked={ todo.status } 
                    onChange={ () => handleToggleState(todo.id)} 
                  />
                  <label className='todoList_label' htmlFor={ idx.toString() }>{ todo.content }</label>
                  <a href='#' onClick={ (e) => handleDelTodo(e, todo.id) }>
                    <i className='fa fa-times'></i>
                  </a>
                </li>
              )
            )
          }
        </ul>
        <div className='todoList_statistics'>
          <p>{ undoneTodo.length } 個待完成項目</p>
          <a href='#' onClick={ handleClearTodo }>清除已完成項目</a>
        </div>
      </div>
    </div>
  )
}
const Todo: React.FC = () => {
  const [nickname, setNickname] = useState('')
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [tag, setTag] = useState('全部')
  const navigate = useNavigate()

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
    navigate('/week3/Login');
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
      const res = await axios.get(`${VITE_BASEURL}/todos`);
      const { data } = res.data;
      setTodos(data);
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }, [])

  // 驗證
  const checkOut = useCallback(async () => {
    try {
      // 取得 Cookie
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
      axios.defaults.headers.common['Authorization'] = token;
      const res = await axios.get(`${VITE_BASEURL}/users/checkout`);
      setNickname(res.data.nickname);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
        navigate('/week3/Login');
      }
    }
  }, [navigate]); // Include 'navigate' in the dependency array

  useEffect(() => {
    checkOut()
    handleGetTodo()
  }, [tag, checkOut , handleGetTodo])

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
            <input type='text' placeholder='請輸入待辦事項' value={ text } onChange={ handleInputChange }/>
            <a href='#' onClick={ handleAddTodo }><i className='fa fa-plus'></i></a>
          </div>
          {
            todos.length 
            ? <TodoList tag={ tag } handleChangeTag={ handleChangeTag } todos={ todos } handleGetTodo={ handleGetTodo } ></TodoList>
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
