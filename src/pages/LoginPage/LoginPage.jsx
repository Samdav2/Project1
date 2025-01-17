import React, { useState } from 'react';
import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(localStorage.getItem('rememberMe') === 'true');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const login = import.meta.env.VITE_USER_LOGIN;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(login, user);

      if (response.data) {
        const { brandname, profile } = response.data;

        if (location.state?.eventId && !profile.brandname) {
          navigate(`/get-ticket/${location.state?.eventId}`, {
            state: { ...profile, eventId: location.state.eventId },
          });
        } else if (profile.brandname) {
          navigate("/creator-dashboard", { state: profile });
        } else {
          navigate("/", { state: profile });
        }
      } else {
        toast.error(response.data.message || "Invalid Credential. Wrong Email Or Password");
      }
    } catch (error) {
      toast.error("Invalid Credential. Wrong Email Or Password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem('rememberMe', newState);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-page">
        <div className="login-form">
          <h1>Welcome Back</h1>
          <p className="subtitle">Enter your email and password to sign in</p>
          <form onSubmit={handleLogin}>
            <div className="input-groups">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-groups">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={isChecked}
                onChange={handleToggle}
                className="remember-checkbox"
              />
              <label htmlFor="rememberMe" className="remember-label">
                Remember me
              </label>
            </div>

            <button type="submit" disabled={isSubmitting} className="button">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/sign-up">Sign up</a>
          </p>
          <p className="signup-link">
            Forgot Password? <a href="/reset-password">Reset password</a>
          </p>
        </div>

        <div className="sidebar1">
          <img src="/assets/owl-logo.svg" alt="Owl" />
        </div>
      
      </div>
    </div>
  );
};

export default LoginPage;
