// import { useState } from 'react'
import { NavLink } from 'react-router-dom'
const Header: React.FC = () => {
  return (
    <>
      {/* NavLink */}
      <header>
        <div className="nav-link">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>

          <NavLink to="/week1">
            <p>week1頁面</p>
          </NavLink>

          <NavLink to="/week2">
            <p>week2頁面</p>
          </NavLink>

        </div>
      </header>
    </>
  )
}

export default Header
