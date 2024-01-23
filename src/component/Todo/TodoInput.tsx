import axios, { AxiosError } from 'axios'
import { useState ,useRef } from 'react'
const { VITE_BASEURL } = import.meta.env

type InputType = { 
  name: string, 
  id: string,
  handleGetTodo: () => void,
}
// TodoInput
const TodoInput = ({ name, id , handleGetTodo }: InputType ) => {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlerSave = async() => {
    setText(inputRef?.current?.value || '')
    try {
      const res = await axios.put(`${VITE_BASEURL}/todos/${id}/`, {
        content: inputRef?.current?.value,
      })
      if(res?.data?.status) {
        alert('更改成功')
        handleGetTodo()
        setEdit(!edit)
      }
    } 
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message)
      }
    }
  }
  const handlerToggle = () =>{
    setEdit(!edit)
  }
  return (
    <>
      { edit
        ? <div className="box bg-violet-100">
            <input ref={ inputRef } className='border-0 mb-2' type='text' id='name' name='name' defaultValue={ text } />
            <button className='border-0 bg-violet-300 py-4px' onClick={ handlerSave }>更改</button>
          </div>
        : <span className='todoList_label' onClick={ handlerToggle }>{ text }</span>
      }
    </>
  )
}
export default TodoInput
