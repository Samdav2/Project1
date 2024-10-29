import React from 'react';
import './LoginPage.css';
import owlImage from './assets/teeth-8770514-1280.svg';
import switchBase from './assets/switch-base.svg';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form">
        <h1>Welcome Back</h1>
        <p className="subtitle">Enter your email and password to sign in</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Your email address" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Your password" />
        </div>

        <div className="remember-me">
          <img src={switchBase} alt="Switch" />
          <label>Remember me</label>
        </div>

        <button className="signin-button">SIGN IN</button>

        <p className="signup-link">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>

      <div className="sidebar">
        <img src={owlImage} alt="Owl" />
      </div>
    </div>
  );
};

export default LoginPage;
