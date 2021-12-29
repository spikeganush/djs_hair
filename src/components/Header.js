import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../img/logo.png'

function Header() {
  return (
    //navbar with a link to home, message, list, user at the left and at the right a link to an icon for login and register
    // with using vanilla css
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} className="logo d-inline-block align-center" alt="" />
        <span className="navbar-brand mb-0 h1">
          <strong>
            <span className="text-light">
              <i className="fas fa-home"></i>
            </span>
            <span className="text-light"> Home</span>
          </strong>
        </span>
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/message">
              <strong>
                <span className="text-light">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="text-light"> Message</span>
              </strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/list">
              <strong>
                <span className="text-light">
                  <i className="fas fa-list"></i>
                </span>
                <span className="text-light"> List</span>
              </strong>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              <strong>
                <span className="text-light">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                <span className="text-light"> Login</span>
              </strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              <strong>
                <span className="text-light">
                  <i className="fas fa-user-plus"></i>
                </span>
                <span className="text-light"> Register</span>
              </strong>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
