import React, { useState } from 'react';
import './ProfileCreation.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileCreation = () => {
  const [selectedForm, setSelectedForm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state.id)

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    user_id: location.state.id,
  });

  const [creator, setCreator] = useState({
    name: location.state.name,
    email: location.state.email,
    address: '',
    phoneNo: '',
    user_id: location.state.id,
    brandName: ''
  });

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));

    setCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(user);
    try {
      const response = await axios.post('https://tick-dzls.onrender.com/profile/userProfiles', user,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data);
      if (response.data) {
        console.log('User Profile Created Successfully');
        navigate("/user-dashboard", {state: {email: location.state.email, name: user.name, id: user.id}})
        console.log(response.data)

      } else {
        console.log('Error Creating Profile');
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const handleSubmitCreator = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(creator);
    try {
      const response = await axios.post('https://tick-dzls.onrender.com/profile/userProfiles', creator, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
       console.log(response.data);
      if (response.data) {
        console.log('Creator Profile Created Successfully');
        navigate("/creator-dashboard", {state: {email: creator.email, name: creator.name, id: creator.id}})
    
        console.log(response.data)

      } else {
        console.log('Error Creating Profile');
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const UserForm = () => (
    <div className="form-container">
      <h2>User Profile Creation</h2>
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
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );

  const CreatorForm = () => (
    <div className="form-container">
      <h2>Creator Profile Creation</h2>
      <form onSubmit={handleSubmitCreator}>
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
          <label>Brand Name</label>
          <input
            type="text"
            placeholder="Your Brand Name"
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
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div className="dynamic-forms">
      <h1>Select a Profile</h1>
      <div className="select-wrapper">
        <label htmlFor="form-select">Choose a form:</label>
        <select id="form-select" onChange={handleFormChange} className="select">
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="user">User Profile</option>
          <option value="creator">Creator Profile</option>
        </select>
      </div>

      <div className="form-display">
        {selectedForm === 'user' && <UserForm />}
        {selectedForm === 'creator' && <CreatorForm />}
      </div>
    </div>
  );
};

export default ProfileCreation;
