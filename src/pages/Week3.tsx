import '@/assets/week03.scss'
import { Outlet ,Link } from 'react-router-dom'

// const apiUrl = "https://todolist-api.hexschool.io"
// ooopp42@hotmail.com
// 26473564
// curry
// -NnrOEhKXcXssUhHmlI1

const Week3: React.FC = () => {
  return (
    <>
      <nav className="px-5 pt-0 flex items-center">
        <ul className="w-full flex justify-center">
          <li className="mr-3 mt-0">
            <Link to="/week3/Login" className='block border px-40px py-15px'> Login </Link>
          </li>
          <li className="mr-3 mt-0">
            <Link to="/week3/SignUp" className='block border px-40px py-15px'> SignUp </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
export default Week3
