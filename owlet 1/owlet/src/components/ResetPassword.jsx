import React from 'react';
import './ResetPassword.css';
import messageIcon from './assets/iconly-light-message.svg';
import arrowIcon from './assets/arrow-left.svg';

const ResetPassword = () => {
  return (
    <div className="reset-password">
      <header className="header">
        <img src={arrowIcon} alt="Back" className="back-icon" />
        <div className="status-bar">
          <span className="time">9:41</span>
          <img src="./assets/cellular-connection.svg" alt="Cellular" className="status-icon" />
          <img src="./assets/wifi.svg" alt="WiFi" className="status-icon" />
          <img src="./assets/battery.svg" alt="Battery" className="status-icon" />
        </div>
      </header>

      <div className="content">
        <h1>Resset Password</h1>
        <p className="description">
          Please enter your email address to request a password reset
        </p>

        <div className="input-container">
          <img src={messageIcon} alt="Email Icon" />
          <input type="email" placeholder="abc@email.com" />
        </div>

        <button className="send-button">
          SEND
          <span className="send-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
