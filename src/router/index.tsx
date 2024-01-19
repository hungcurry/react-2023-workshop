import { useRoutes } from 'react-router-dom'
// ===================
// ... page ...
// ===================
import Home from '@/pages/Home'
import Week1 from "@/pages/Week1"
import Week2 from "@/pages/Week2"
import Week3 from "@/pages/Week3"
// TodoList
import Login from "@/pages/Login"
import SignUp from '@/pages/SignUp'
import Todo from '@/pages/Todo'

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
    children: [
      {
        path: 'Login',
        element: <Login />,
      },
      {
        path: 'SignUp',
        element: <SignUp />,
      },
    ],
  },
  {
    path: 'Todo',
    element: <Todo />,
  },
]

const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}
export default AppRoutes
