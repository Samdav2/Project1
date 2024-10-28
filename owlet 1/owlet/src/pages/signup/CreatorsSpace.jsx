import React from 'react';
import './CreatorsSpace.css';
import owlImage from './assets/teeth-8770514-1280.svg';

const CreatorsSpace = () => {
  return (
    <div className="creators-space">
      <div className="form-container">
        <h1>Creator’s Space</h1>

        <div className="signup-section">
          <h2>Sign up</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <div className="or-continue">
            <span>or continue</span>
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        <div className="login-section">
          <h2>Log in</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="login-button">Log in</button>
          <a href="#forget" className="forgot-password">Forget Password</a>
        </div>
      </div>

      <div className="sidebar">
        <img src={owlImage} alt="Owl" />
      </div>
    </div>
  );
};

export default CreatorsSpace;
