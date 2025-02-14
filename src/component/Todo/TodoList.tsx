import type { MouseEvent } from 'react'
import TodoInput from '@/component/Todo/TodoInput'
import axios, { AxiosError } from 'axios'
import { memo, useMemo, useState } from 'react'

const { VITE_BASEURL } = import.meta.env

type TTodoItem = {
  // todoItem
  // {
  //   "content": "333",
  //   "createTime": 1739342750,
  //   "id": "-OIsu13LtP9t9PJVUDaY",
  //   "status": true
  // }
  content: string
  createTime: number
  id: string
  status: boolean
}
type TPropsTodo = {
  todos: TTodoItem[]
  handleGetTodo: () => void
}
// TodoList
const TodoList = memo(({ todos, handleGetTodo }: TPropsTodo) => {
  const [tag, setTag] = useState('全部')

  // ~類似Vue Computed
  const filterTodo = useMemo(() => {
    return todos.filter((item) => {
      switch (tag) {
        case '全部':
          return item
        case '待完成':
          return !item.status
        case '已完成':
          return item.status
        default:
          return false
      }
    })
  }, [todos, tag])
  const undoneTodo = useMemo(() => {
    return todos.filter((item) => {
      return !item.status
    })
  }, [todos])

  const handleChangeTag = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // setTag((e.target as HTMLElement)?.textContent || '')
    setTag(e.currentTarget?.textContent || '')
  }
  const handleToggleState = async (id: string) => {
    try {
      const res = await axios.patch(`${VITE_BASEURL}/todos/${id}/toggle`)
      if (res?.data?.status)
        handleGetTodo()
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handleDelTodo = async (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`${VITE_BASEURL}/todos/${id}`)
      if (res?.data?.status)
        handleGetTodo()
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handleClearFinishTodo = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const finishTodos = todos.filter(todo => todo.status)

    // 如果沒有已完成的項目，顯示提示並停止執行
    if (finishTodos.length === 0) {
      alert('當前沒有已完成項目')
      return
    }
    // 再刪除已完成的項目
    finishTodos.forEach(todo => handleDelTodo(e, todo.id))
  }
  return (
    <div className="todoList_list">
      <ul className="todoList_tab">
        <li>
          <a href="#" className={tag === '全部' ? 'active' : ''} onClick={handleChangeTag}>全部</a>
        </li>
        <li>
          <a href="#" className={tag === '待完成' ? 'active' : ''} onClick={handleChangeTag}>待完成</a>
        </li>
        <li>
          <a href="#" className={tag === '已完成' ? 'active' : ''} onClick={handleChangeTag}>已完成</a>
        </li>
      </ul>
      {/* ----- */}
      <div className="todoList_items">
        <ul className="todoList_item">
          {
            filterTodo.map((todo, idx) => (
              <li key={todo.id}>
                <input
                  className="todoList_input"
                  id={idx.toString()}
                  type="checkbox"
                  value={todo.status.toString()}
                  checked={todo.status}
                  onChange={() => handleToggleState(todo.id)}
                />
                <TodoInput id={todo.id} name={todo.content} handleGetTodo={handleGetTodo} />
                <a href="#" onClick={e => handleDelTodo(e, todo.id)}>
                  <i className="fa fa-times"></i>
                </a>
              </li>
            ))
          }
        </ul>
        <div className="todoList_statistics">
          <p>
            未完成
            {' '}
            { undoneTodo.length }
            {' '}
            個項目
          </p>
          <a href="#" onClick={handleClearFinishTodo}>清除已完成項目</a>
        </div>
      </div>
    </div>
  )
})
export default TodoList
