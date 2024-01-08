import { useRoutes } from 'react-router-dom'
// ===================
// ... page ...
// ===================
import Home from '@/pages/Home.tsx'
import Week1 from "@/pages/Week1.tsx"
import Week2 from "@/pages/Week2.tsx"

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
]

const AppRoutes: React.FC = () => {
  return useRoutes(routes)
}
export default AppRoutes
