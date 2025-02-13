import axios, { AxiosError } from 'axios'
import { useRef, useState } from 'react'

const { VITE_BASEURL } = import.meta.env

type TPropsInput = {
  name: string
  id: string
  handleGetTodo: () => void
}
// TodoInput
function TodoInput({ name, id, handleGetTodo }: TPropsInput) {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlerSave = async () => {
    const value = inputRef?.current?.value
    try {
      const res = await axios.put(`${VITE_BASEURL}/todos/${id}/`, {
        content: value,
      })
      if (res?.data?.status) {
        alert('更改成功')
        handleGetTodo()
        setEdit(!edit)
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handlerToggle = () => {
    setEdit(!edit)
  }
  return (
    <>
      {edit
        ? (
            <div className="box bg-violet-100">
              <input ref={inputRef} className="border-0 mb-2" type="text" id="name" name="name" defaultValue={name} />
              <button type="button" className="border-0 bg-violet-300 py-4px" onClick={handlerSave}>
                更改
              </button>
            </div>
          )
        : (
            <span className="todoList_label" onClick={handlerToggle}>
              {name}
            </span>
          )}
    </>
  )
}
export default TodoInput
