import React, { useState } from 'react';
import axios from 'axios';
import '../SignUp/signUp.css';
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"

const SignUpPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!user.username || !user.email || !user.password) {
      setMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    console.log(user)

    try {
      const response = await axios.post("https://tick-dzls.onrender.com/auth/signup", user);
      console.log(response.data);
      if (response.data) {
        setMessage(response.data.message);
        // Correct path to the EmailVerify component
        console.log("sent")
        navigate("/email", {state : { email: user.email }})
      } else {
        setMessage(response.data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Unable to create a profile now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
    <div className="1signup-page login-page">
    <BackButton />
      <div className="1signup-form login-form">


        <form className="form" onSubmit={handleSignUp}>
        <h2 className='signupHeader'>Create Account</h2>
          <div className="input-groups">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your full name"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

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
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="remember-me">
            <span className="rememberMeBtn" id='rememberMeBtn'>
              <span className="rememberToggle" id='rememberToggle'></span>
            </span>
            <label className='label'>Remember me?</label>
          </div>

          <button
            className="signin-button"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "SIGN UP"}
          </button>

          {message && <p className="message">{message}</p>}

          <p className="signup-link2">
          Already have an account? <a href='/login'>Sign in</a>
        </p>

        </form>
      </div>

      <div className="sidebar1">
        <img src='/assets/owl-logo.svg' alt="Owl" />
      </div>
      </div>
       <Footer />
    </div>
  );
};

export default SignUpPage;
