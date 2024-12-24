import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo-2.png'
import profile from'../../assets/profile_image.png'
import sitamarhi from'../../assets/sitamarhi.png'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <img src={logo} alt="" />
      </div>
      <div className='navbar-text'>
       <span> SIT Sitamarhi</span> <img src={sitamarhi} alt="" />
      </div>
      <div className='navbar-admin'>
        <img src={profile} alt="" />
      </div>
    </div>
  )
}

export default Navbar
