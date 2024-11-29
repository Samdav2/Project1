import React from 'react';
import './ResetPassword.css';
import MessageIcon from '../assets/iconly-light-message.svg';


export const ResetPassword = () => {
  return (
    <div className="reset-password">
      <div className="content">
        <h1>Reset Password</h1>
        <p className="description">
          Please enter your email address to request a password reset
        </p>

        <div className="input-container">
          <img src={MessageIcon} alt="Email Icon" />
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
