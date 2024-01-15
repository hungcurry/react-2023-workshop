import { useRoutes } from 'react-router-dom'
// ===================
// ... page ...
// ===================
import Home from '@/pages/Home.tsx'
import Week1 from "@/pages/Week1.tsx"
import Week2 from "@/pages/Week2.tsx"
import Week3 from "@/pages/Week3.tsx"

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
  },
]

const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}
export default AppRoutes
