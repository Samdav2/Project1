import React from 'react';
import './ResetPassword.css';
import MessageIcon from '../assets/iconly-light-message.svg';

const ResetPassword = () => {
  // Handle form submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
  };

  return (
    <div className="reset-password">
       <div className="wrapper">
         <form action=""  onSubmit={handleSubmit}></form>
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
    </div>
  );
};

export default ResetPassword;
