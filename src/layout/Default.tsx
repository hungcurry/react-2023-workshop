// import { Route, Routes } from 'react-router-dom'
import Router from '@/router/index';
// ===================
// ... layout ...
// ===================
import Header from './Header.tsx'
import Footer from './Footer.tsx'

const Default: React.FC = () => {
  return (
    <>
      <Header />
      <hr className='m-10px mt-4px'/>
      <div className="container">
      {/* 使用物件index.tsx 來管理路由 */}
        <Router />
      </div>
      <Footer />
    </>
  )
}

export default Default
