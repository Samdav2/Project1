import React from 'react'
import './Navbar.css' ;
import owlLogo from './assets/owl-2.svg';

const navbar = () => {
  return (
     <div className="navbar">
      <div className="navbar-logo">
        <img src={owlLogo} alt="Owl Logo" />
      </div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#profile">Profile</a>
        <a href="#event">Event</a>
        <a href="#about">About</a>
      </div>
      <button className="navbar-button">Sign in / Sign up</button>
    </div>
  )
}

export default navbar
