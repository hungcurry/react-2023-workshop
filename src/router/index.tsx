// ===================
// ... page ...
// ===================
import Home from '@/pages/Home'
// TodoList
// import Login from "@/component/Login"
// import SignUp from '@/component/SignUp'
import Todo from '@/pages/Todo'
import Week1 from '@/pages/Week1'
import Week2 from '@/pages/Week2'
import Week3 from '@/pages/Week3'
import BeforeEnter from '@/router/beforeEnter'
import { useRoutes } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/week1',
    element: <Week1 />,
  },
  {
    path: '/week2',
    element: <Week2 />,
  },
  {
    path: '/week3',
    element: <Week3 />,
    // children: [
    //   {
    //     path: 'Login',
    //     element: <Login />,
    //   },
    //   {
    //     path: 'SignUp',
    //     element: <SignUp />,
    //   },
    // ],
  },
  {
    path: '/todo',
    element: (
      <BeforeEnter>
        <Todo />
      </BeforeEnter>
    ),
  },
]

const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}
export default AppRoutes
