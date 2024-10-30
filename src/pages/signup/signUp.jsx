import React from 'react';
import './SignUpPage.css';
import facebookIcon from './assets/facebook.svg';
import appleIcon from './assets/apple.svg';
import googleIcon from './assets/google.svg';
import backgroundOwl from './assets/teeth-8770514-1280.svg';

const SignUpPage = () => {
  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Register with</h2>
        <div className="social-buttons">
          <img src={facebookIcon} alt="Facebook" />
          <img src={appleIcon} alt="Apple" />
          <img src={googleIcon} alt="Google" />
        </div>
        <p className="or-divider">or</p>

        <div className="input-group">
          <label>Name</label>
          <input type="text" placeholder="Your full name" />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Your email address" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Your password" />
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="signup-button">SIGN UP</button>

        <p className="login-link">Already have an account? <a href="#signin">Sign in</a></p>
      </div>

      <div className="sidebar">
        <img src={backgroundOwl} alt="Owl" />
      </div>
    </div>
  );
};

export default SignUpPage;
