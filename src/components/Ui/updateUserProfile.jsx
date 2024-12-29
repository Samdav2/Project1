import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './updateUserProfile.css'
import { useLocation } from "react-router-dom";
import dotenv from "dotenv"

const UpdateUserProfile = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state.user_id);

    const [user, setUser] = useState({
        user_id: location.state.user_id,
        name: "",
        phoneNo: "",
        address: "",
        email: ""
    });

    const updateUser = import.meta.env.VITE_UPDATE_USER_PROFILE

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        if (!user.name || !user.phoneNo || !user.address || !user.email) {
            console.error("All fields are required!");
            alert("Please fill in all fields before submitting.");
            return;
        }

        setIsSubmitting(true);
        console.log(user);
        try {
            const response = await axios.put(updateUser, user,
                {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  }
             );
             console.log("sending data", user)
            console.log(response.data);
            if (response.data) {
                console.log('User Profile Updated Successfully');
                navigate("/user-dashboard", {state: {name: user.name, email: user.email, user_id: user.user_id}});
                console.log(response.data)
            } else {
                console.log('Error Updating Profile')
            }
        } catch (error){
            console.error(error);
        }
        setIsSubmitting(false);
    };


    return(
        <div className="form-container">
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmitUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={user.name}
              onChange={handleChange}
              name="name"
            />
            <label>Phone No</label>
            <input
              type="number"
              placeholder="Enter your phone Number"
              value={user.phoneNo}
              onChange={handleChange}
              name="phoneNo"
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your Address"
              value={user.address}
              onChange={handleChange}
              name="address"
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="button">
                    {isSubmitting ? "Updating Profile..." : "Update"}
                </button>
        </form>
      </div>

    )
}

export default UpdateUserProfile
