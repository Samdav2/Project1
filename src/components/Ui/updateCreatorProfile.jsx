import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './updateCreatorProfile.css'
import { useLocation } from "react-router-dom";
import dotenv from "dotenv"

const UpdateCreatorProfile = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    //console.log(location.state.user_id);

    const [creator, setCreator] = useState({
        user_id: location.state.user_id,
        name: "",
        phoneNo: "",
        address: "",
        brandName:"",
        email: ""
    });

    const updateCreator = import.meta.env.VITE_UPDATE_CREATOR_PROFILE

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCreator((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        if (!creator.name || !creator.phoneNo || !creator.address || !creator.email || !creator.brandName) {
            console.error("All fields are required!");
            alert("Please fill in all fields before submitting.");
            return;
        }

        setIsSubmitting(true);
        console.log(user);
        try {
            const response = await axios.put(updateCreator, creator,
                {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  }
             );
             console.log("sending data", creator)
            console.log(response.data);
            if (response.data) {
                console.log('User Profile Updated Successfully');
                navigate("/creator-dashboard")
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
        <h2>Update Your Creator Profile</h2>
        <form onSubmit={handleSubmitUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={creator.name}
              onChange={handleChange}
              name="name"
            />
            <label>Phone No</label>
            <input
              type="number"
              placeholder="Enter your phone Number"
              value={creator.phoneNo}
              onChange={handleChange}
              name="phoneNo"
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your Address"
              value={creator.address}
              onChange={handleChange}
              name="address"
            />
            <label>Brand Name:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={creator.brandName}
              onChange={handleChange}
              name="brandName"
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={creator.email}
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

export default UpdateCreatorProfile
