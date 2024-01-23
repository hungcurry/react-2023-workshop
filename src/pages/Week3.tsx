import '@/assets/week03.scss'
import SignUp from '@/component/Todo/SignUp'
import Login from "@/component/Todo/Login"
import { useState , MouseEvent } from 'react'

// const apiUrl = "https://todolist-api.hexschool.io"
// todo API https://todolist-api.hexschool.io/doc/
// ooopp42@hotmail.com
// 26473564
// curry

const Week3: React.FC = () => {
  const [tab, setTab] = useState('登入')
  const handleChangeTab = (e:MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTab((e.target as HTMLElement)?.textContent || "")
  }
  return (
    <>
      <div className='bg-yellow'>
        <nav className="max-w-800px px-31px pt-20% md:pt-100px flex items-center mx-auto">
          <ul className="w-full flex justify-between md:justify-center bg-violet-200 py-8px px-10px rounded-md">
            <li className="mt-0">
              <a href='#' 
                className={`btnTab rounded-md ${tab === '登入' ? 'active' : ''}`} 
                onClick={ handleChangeTab }
                >登入
              </a>
            </li>
            <li className="mt-0">
              <a href='#' 
                className={`btnTab rounded-md ${tab === '註冊' ? 'active' : ''}`} 
                onClick={ handleChangeTab }
                >註冊
              </a>
            </li>
          </ul>
        </nav>
        {/* tab */}
        <div className='context'>
          { tab === '登入' ? <Login/> : <SignUp/> }
        </div>
      </div>
    </>
  )
}
export default Week3
