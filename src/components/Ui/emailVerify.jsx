import React, { useState } from "react";
import './emailVerify.css';
import {  useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
    const location = useLocation()
    const [user, setUser] = useState({
        code: "",
        email: location.state.email
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log(user)

        // Add logic to handle the form submission, such as validating the code
        try{
            const response = await axios.post("https://tick-dzls.onrender.com/auth/verify", user);
      console.log(response.data);
      if (response.data) {
        console.log("Verification succesful")
        navigate("/create-profile", {state: {email: user.email, name: user.username, id: response.data.profile.user_id }})

        console.log(response.data)

      } else {
        console.log("Issue ti wa oo")
      }

        }
        catch (error) {
            console.error(error);

        }
        setIsSubmitting(false);
    };

    return (
        <div className="Formdiv">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Verification Code</label>
                    <input
                        type="text"
                        name="code"
                        value={user.code} // Make input a controlled component
                        placeholder="Enter Verification Code"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={isSubmitting} className="button">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            {message && <p>{message}</p>} {/* Display message */}
        </div>
    );
};

export default EmailVerify;
