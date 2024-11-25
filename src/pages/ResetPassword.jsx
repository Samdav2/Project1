import React from 'react';
import './ResetPassword.css';
import MessageIcon from '../assets/iconly-light-message.svg';
<<<<<<< HEAD
import arrowIcon from '../assets/arrow-left.svg';
import cellularConnection from '../assets/cellular-connection.svg';
import wifi from '../assets/wifi.svg';
import battery from '../assets/battery.svg';
=======

>>>>>>> pullowlet

export const ResetPassword = () => {
  // Handle form submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
  };

  return (
    <div className="reset-password">
<<<<<<< HEAD
      <header className="header">
        <img src={arrowIcon} alt="Back" className="back-icon" />
        <div className="status-bar">
          <span className="time">9:41</span>
          <img src={cellularConnection} alt="Cellular" className="status-icon" />
          <img src={wifi} alt="WiFi" className="status-icon" />
          <img src={battery} alt="Battery" className="status-icon" />
        </div>
      </header>
=======
>>>>>>> pullowlet
       <div className="wrapper">
      <form action=""  onSubmit={handleSubmit}></form>
      <div className="content">
        <h1>Reset Password</h1>
        <p className="description">
          Please enter your email address to request a password reset
        </p>

        <div className="input-container">
          <img src={MessageIcon} alt="Email Icon" />
          <input type="email" placeholder="Enter your email" />
        </div>

        <button type="submit" className="send-button">
          SEND
          <span className="send-icon"></span>
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default ResetPassword;
