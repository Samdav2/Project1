import React, { useState } from 'react';
import './ResetPassword.css';
import MessageIcon from '../assets/iconly-light-message.svg';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"
import dotenv from "dotenv"

const ResetPassword = () => {
  const [ user, setUser ] = useState({
    email: "",
    newPassword: ""
  })

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigate = useNavigate()
  const resetPass = import.meta.env.VITE_RESET_PASS

 const handleSubmit = async (event) => {
  event.preventDefault()
    console.log(user)

    try {
      const response = await axios.put(resetPass, user);
      console.log(response.data);
      if (response.data) {
        console.log("sent")
        navigate("/email", {state : { email: user.email }})
      } 
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div>
    <div>
      <div className="reset-password">
     <BackButton />
       <div className="wrapper">
         <form action=""  onSubmit={handleSubmit}></form>
         <div className="content">
           <h1>Reset Password</h1>
           <p className="description">
            Please enter your email address to request a password reset
            </p>

         <div className="input-container">
         <form onSubmit={handleSubmit}>  
         <div>
           <img src={MessageIcon} alt="Email Icon" />
           <label>Email</label>
           <input type="email" placeholder="abc@email.com" name="email" value={user.email} onChange={handleChange} />
          </div>
           <div> 
           <label>Password</label>
           <input type="password" placeholder="****" name="newPassword" value={user.newPassword} onChange={handleChange} />
           </div>

           <button className="send-button" type="submit">
            SEND
           <span className="send-icon">→</span>
          </button>

           </form>

         </div>
          
       </div>
       
     </div>
     
     </div>
     </div>

    </div>
  );
};

export default ResetPassword;
