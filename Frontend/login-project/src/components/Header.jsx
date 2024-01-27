import React from 'react'
import { NavLink } from 'react-router-dom'
import { LuLogIn } from "react-icons/lu";
import './Header.css'

const Header = ({title}) => {
  return (
    <div className='header'>
        <div className='textTitle'><span class='logo'><LuLogIn></LuLogIn></span>{title}</div>
        <div className='nav-container'>
          <NavLink className="nav" to='/'>Home</NavLink>
        </div>
    </div>
  )
}

export default Header