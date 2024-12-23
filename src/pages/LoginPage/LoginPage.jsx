import React, { useState } from 'react';
import './LoginPage.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from "dotenv"


const LoginPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const login = import.meta.env.VITE_USER_LOGIN

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
      setMessage("Login Successful");

      // Destructure brandname and profile from response data
      const { brandname, profile } = response.data;

      // If location.state.eventId is not null and brandname is not available, navigate to /ticket
      if (location.state?.eventId && !profile.brandname) {
        navigate(`/get-ticket/${location.state?.eventId}`, {
          state: {
            eventId: location.state.eventId,
            name: profile.name,
            email: profile.email,
            user_id: profile.user_id,
            phoneNo: profile.phoneNo,
          },
        });
      } else if (profile.brandname) {
        // If brandname exists, navigate to /creator-dashboard
        navigate("/creator-dashboard", {
          state: {
            name: profile.name,
            email: profile.email,
            user_id: profile.user_id,
            brandName: profile.brandname,
            phoneNo: profile.phoneNo,
          },
        });
      } else {
        // If brandname is null or doesn't exist, navigate to /home
        navigate("/", {
          state: {
            name: profile.name,
            email: profile.email,
            user_id: profile.user_id,
            phoneNo: profile.phoneNo,
          },
        });
      }
    } else {
      setMessage(response.data.message || "Invalid Credential. Wrong Email Or Password");

    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error("Invalid Credential. Wrong Email Or Password");
    setMessage('Invalid Credential. Please Check Info and try again');
  } finally {
    setIsSubmitting(false);
  }
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
            <input type="email" placeholder="Your email address" name='email' value={user.email} onChange={handleChange} />
          </div>

          <div className="input-groups">
            <label>Password</label>
            <input type="password" placeholder="Your password" name='password' value={user.password} onChange={handleChange} />
          </div>

          <div className="remember-me">
            <span className="rememberMeBtn" id='rememberMeBtn'>
              <span className="rememberToggle" id='rememberToggle'></span>
            </span>
            <label className='label'>Remember me?</label>
          </div>

          <button type="submit" disabled={isSubmitting} className="button">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href='/sign-up'>Sign up</a>
        </p>
        <p className="signup-link">
          Forgot Password? <a href='/reset-password'>Reset password</a>
        </p>
      </div>

      <div className="sidebar1">
        <img src='/assets/owl-logo.svg' alt="Owl" />
      </div>
      <div className="sidebarMobile">
        <img src='/assets/owl-logo.svg' alt="Owl" />
      </div>
      </div>
    
    </div>
  );
};

export default LoginPage;
