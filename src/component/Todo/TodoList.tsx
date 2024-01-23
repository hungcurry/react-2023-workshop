import axios, { AxiosError } from 'axios'
import { MouseEvent } from 'react'
import { useMemo } from 'react'
import TodoInput from '@/component/Todo/TodoInput'
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
          <a href='#' className={ tag === '全部' ? 'active' : '' } onClick={ handleChangeTag } >全部</a>
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
                  <TodoInput id={ todo.id } name={ todo.content } handleGetTodo={ handleGetTodo }/>
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
export default TodoList
