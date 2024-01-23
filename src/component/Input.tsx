import { ChangeEvent } from 'react'
import { useState ,useEffect ,useRef } from 'react'

type childType = { 
  name: string, 
  edit: (id: number, text: string) => void, 
  id: number 
}
const Input = ( { name, edit, id }: childType ) => {
  const [toggle, setToggle] = useState(false)
  const [text, setText] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // console.log('useEffect', toggle );
    if (toggle === true) {
      // console.log(`inputRef` , inputRef);
      const parentElementTD = inputRef.current?.parentNode?.parentNode?.parentNode as HTMLElement;
      parentElementTD?.classList.add('active');
    }else {
      const parentElementTD = spanRef.current?.parentNode?.parentNode as HTMLElement;
      parentElementTD?.classList.remove('active');
    }
  }, [toggle]);

  // !event型別
  // ~import { ChangeEvent, MouseEvent } from 'react'
  // ~MouseEvent<HTMLInputElement>
  // ~ChangeEvent<HTMLInputElement>
  // ~ChangeEvent<HTMLSelectElement>
  // ~MouseEvent<HTMLAnchorElement>

  const handlerEdit = (e: ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
  }
  const handlerSave =()=> {
    edit(id , text)
    setToggle(!toggle)
  }
  const handlerToggle =() =>{
    setToggle(!toggle)
  }
  return (
    <>
      { toggle 
        ? <div className="box bg-violet-100">
            {/* 這邊要綁props的text資料才會連動 */}
            <input ref={ inputRef } className='border-0 mb-2 w-160px' type='text' id='name' name='name' 
              value={ text } onChange={ handlerEdit }
            />
            <button className='border-0 bg-violet-300 py-4px' onClick={ handlerSave }>更改</button>
          </div>
        : <span ref={ spanRef } onClick={ handlerToggle }>{ name }</span>
      }
    </>
  )
}
export default Input
