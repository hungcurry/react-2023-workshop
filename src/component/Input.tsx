import type { ChangeEvent } from 'react'
import { memo, useEffect, useRef, useState } from 'react'

type TPropsInput = {
  name: string
  edit: (id: number, text: string) => void
  id: number
}

const Input = memo(({ name, edit, id }: TPropsInput) => {
  const [toggle, setToggle] = useState(false)
  const [text, setText] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  // 處理父元素 TR 的樣式
  useEffect(() => {
    // if (toggle === true) {
    //   const parentTR = inputRef.current?.closest('tr')
    //   console.log(parentTR)
    //   parentTR?.classList.add('active')
    // } else {
    //   const parentTR = spanRef.current?.closest('tr')
    //   parentTR?.classList.remove('active')
    // }

    const parentTR = (toggle ? inputRef.current : spanRef.current)?.closest('tr')
    parentTR?.classList[toggle ? 'add' : 'remove']('active')
  }, [toggle])

  // #region event型別
  // !event型別
  // ~import { ChangeEvent, MouseEvent } from 'react'
  // ~MouseEvent<HTMLInputElement>
  // ~ChangeEvent<HTMLInputElement>
  // ~ChangeEvent<HTMLSelectElement>
  // ~MouseEvent<HTMLAnchorElement>
  // #endregion
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }
  const handleSave = () => {
    edit(id, text)
    setToggle(false)
  }
  const handleToggle = () => {
    setToggle(true)
  }
  return (
    <>
      {toggle
        ? (
            <div className="box bg-violet-100">
              {/* 這邊要綁props的text資料才會連動 */}
              <input
                ref={inputRef}
                className="border-0 mb-2 w-160px"
                type="text"
                value={text}
                onChange={handleInputChange}
              />
              <button type="button" className="border-0 bg-violet-300 py-4px" onClick={handleSave}>
                更改
              </button>
            </div>
          )
        : (
            <span ref={spanRef} onClick={handleToggle}>
              {name}
            </span>
          )}
    </>
  )
})
export default Input
